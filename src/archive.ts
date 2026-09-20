type ArchiveFile = { name: string; data: Uint8Array };

const encoder = new TextEncoder();
const table = (() => {
  const values = new Uint32Array(256);
  for (let n = 0; n < values.length; n++) {
    let value = n;
    for (let k = 0; k < 8; k++)
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    values[n] = value >>> 0;
  }
  return values;
})();

const crc32 = (data: Uint8Array) => {
  let value = 0xffffffff;
  for (const byte of data) value = table[(value ^ byte) & 0xff] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
};

const dosTime = (date: Date) =>
  (date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1);
const dosDate = (date: Date) =>
  ((Math.max(1980, date.getFullYear()) - 1980) << 9) |
  ((date.getMonth() + 1) << 5) |
  date.getDate();

const concat = (parts: Uint8Array[]) => {
  const result = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
  let offset = 0;
  for (const part of parts) { result.set(part, offset); offset += part.length; }
  return result;
};

const header = (size: number, write: (view: DataView) => void) => {
  const bytes = new Uint8Array(size);
  write(new DataView(bytes.buffer));
  return bytes;
};

/** Create a portable UTF-8 ZIP without compression. Report screenshots are
 * JPEG already, so compression would add work without materially shrinking it.
 */
export function zip(files: ArchiveFile[], now = new Date()): Uint8Array {
  const local: Uint8Array[] = [], central: Uint8Array[] = [];
  let offset = 0;
  for (const file of files) {
    const name = encoder.encode(file.name.replaceAll("\\", "/")),
      crc = crc32(file.data), time = dosTime(now), date = dosDate(now);
    const localHeader = header(30, view => {
      view.setUint32(0, 0x04034b50, true); view.setUint16(4, 20, true);
      view.setUint16(6, 0x0800, true); view.setUint16(8, 0, true);
      view.setUint16(10, time, true); view.setUint16(12, date, true);
      view.setUint32(14, crc, true); view.setUint32(18, file.data.length, true);
      view.setUint32(22, file.data.length, true); view.setUint16(26, name.length, true);
    });
    local.push(localHeader, name, file.data);
    const centralHeader = header(46, view => {
      view.setUint32(0, 0x02014b50, true); view.setUint16(4, 20, true);
      view.setUint16(6, 20, true); view.setUint16(8, 0x0800, true);
      view.setUint16(10, 0, true); view.setUint16(12, time, true);
      view.setUint16(14, date, true); view.setUint32(16, crc, true);
      view.setUint32(20, file.data.length, true); view.setUint32(24, file.data.length, true);
      view.setUint16(28, name.length, true); view.setUint32(42, offset, true);
    });
    central.push(centralHeader, name);
    offset += localHeader.length + name.length + file.data.length;
  }
  const centralSize = central.reduce((sum, part) => sum + part.length, 0),
    end = header(22, view => {
      view.setUint32(0, 0x06054b50, true); view.setUint16(8, files.length, true);
      view.setUint16(10, files.length, true); view.setUint32(12, centralSize, true);
      view.setUint32(16, offset, true);
    });
  return concat([...local, ...central, end]);
}

export const utf8 = (value: string) => encoder.encode(value);

