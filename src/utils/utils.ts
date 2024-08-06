import { Entity } from "../types/textRazor";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const countEntitiesByType = (entities: Entity[]) => {
  const typeCount: Record<string, number> = {};
  const uniqueEntities = new Set<string>();

  entities.forEach(entity => {
    if (!uniqueEntities.has(entity.entityId)) {
      uniqueEntities.add(entity.entityId);
      const types = entity.type || ["Unknown"];
      types.forEach(type => {
        if (type !== "Unknown") {
          typeCount[type] = (typeCount[type] || 0) + 1;
        }
      });
    }
  });

  return Object.entries(typeCount)
    .map(([type, count]) => ({ type, count }))
    .slice(0, 10);
};

export const countEntitiesByConfidence = (entities: Entity[]) => {
  const uniqueEntities = new Map<string, number>();

  entities.forEach(entity => {
    if (!uniqueEntities.has(entity.entityId)) {
      uniqueEntities.set(entity.entityId, entity.confidenceScore);
    }
  });

  return Array.from(uniqueEntities)
    .map(([entity, confidence]) => ({ entity, confidence }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 25);
};

export const entityTypeCounts = (entities: Entity[]) => {
  const counts = countEntitiesByType(entities);
  return counts.map((entry, index) => ({
    ...entry,
    fill: COLORS[index % COLORS.length],
  }));
};

export const entityConfidenceData = (entities: Entity[]) => {
  return countEntitiesByConfidence(entities);
};

export const highlightEntitiesInSentence = (sentence: string, entities: Entity[]) => {
  return entities.reduce((highlightedSentence, entity) => {
    const regex = new RegExp(`\\b(${entity.matchedText})\\b`, 'gi');
    return highlightedSentence.replace(
      regex,
      `<span style="text-decoration: underline; font-weight: 600;">$1</span>`
    );
  }, sentence);
};

export const splitTextIntoSentences = (text: string) => {
  return text.match(/[^.!?]+[.!?]+/g) || [text];
};
