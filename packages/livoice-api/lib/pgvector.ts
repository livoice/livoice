export const formatVectorLiteral = (values: number[] | undefined) => {
  if (!values?.length) return;

  return `vector'[${values.map(value => (Number.isFinite(value) ? value.toString() : '0')).join(',')}]'`;
};
