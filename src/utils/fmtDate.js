// Timestamp 임포트는 선택(웹/노드 환경 차이 고려해서 duck-typing으로 처리)
export function fmtDate(value, { includeTime = false } = {}) {
  const d = toDateSafe(value);
  if (!d) return '-';

  const dateOpts = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const timeOpts = { hour: '2-digit', minute: '2-digit' };
  const opts = includeTime ? { ...dateOpts, ...timeOpts } : dateOpts;

  return new Intl.DateTimeFormat('ko-KR', opts).format(d);
}

function toDateSafe(v) {
  if (!v) return null;

  // Firestore Timestamp 인스턴스 (toDate가 있음)
  if (typeof v.toDate === 'function') {
    const d = v.toDate();
    return isNaN(+d) ? null : d;
  }

  // Timestamp-like POJO {seconds, nanoseconds}
  if (typeof v === 'object' && v !== null && 'seconds' in v && 'nanoseconds' in v) {
    const ms = Number(v.seconds) * 1000 + Number(v.nanoseconds) / 1e6;
    const d = new Date(ms);
    return isNaN(+d) ? null : d;
  }

  // 이미 Date
  if (v instanceof Date) return isNaN(+v) ? null : v;

  // 숫자(밀리초 또는 초)
  if (typeof v === 'number') {
    const ms = v > 1e12 ? v : v * 1000; // 1e12 기준으로 ms/초 추정
    const d = new Date(ms);
    return isNaN(+d) ? null : d;
  }

  // 문자열
  if (typeof v === 'string') {
    const d = new Date(v);
    return isNaN(+d) ? null : d;
  }

  return null;
}
