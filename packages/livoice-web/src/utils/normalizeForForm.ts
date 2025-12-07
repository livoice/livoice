type Result = Record<string, unknown>;
type RelationsMapping = Record<string, string>;

export function normalizeForForm<
  TResult extends Result = Result,
  TRelationsMappings extends RelationsMapping = RelationsMapping
>(
  object: Record<string, unknown> | null | undefined,
  relationsMappings: TRelationsMappings = {} as TRelationsMappings
): Result | TResult | undefined {
  if (!object) return undefined;

  return Object.entries(relationsMappings).reduce(
    (acc, [sourceKey, targetKey]) => {
      const sourceValue = acc[sourceKey];
      acc[targetKey] = Array.isArray(sourceValue)
        ? sourceValue.map(({ id }) => id)
        : (sourceValue as { id?: string | undefined })?.id;
      delete acc[sourceKey];

      return acc;
    },
    { ...object }
  );
}
