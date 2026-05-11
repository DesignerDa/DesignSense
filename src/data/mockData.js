export const scenarios = [
  { id: 's1', title: 'User Onboarding Drop-off', description: 'Users are abandoning the app during the initial sign-up flow.' },
  { id: 's2', title: 'Low Feature Discovery', description: 'A powerful new feature is being ignored by the majority of active users.' },
  { id: 's3', title: 'Checkout Process Friction', description: 'High cart abandonment rate on mobile devices.' }
];

export const methods = [
  { id: 'm1', title: 'Crazy 8s', description: 'Rapid ideation to generate a wide variety of solutions quickly.' },
  { id: 'm2', title: 'User Journey Mapping', description: 'Visualizing the user experience over time to identify pain points.' },
  { id: 'm3', title: 'A/B Testing', description: 'Comparing two versions of a screen to see which performs better.' }
];

export const outcomes = [
  {
    scenarioId: 's1',
    methodId: 'm1',
    text: 'By sketching rapidly (Crazy 8s), the team discovered that breaking the onboarding into smaller, gamified steps reduced the perceived effort. We tested 8 completely different layouts in just a few minutes.',
    reflection: 'What surprised you about the ideas generated? How might this approach be applied to other parts of the app?'
  },
  {
    scenarioId: 's1',
    methodId: 'm2',
    text: 'Journey Mapping revealed a hidden emotional low point when users were asked for credit card info before seeing value. We decided to delay this request.',
    reflection: 'How did mapping the user emotions change your perspective on the flow?'
  },
  {
    scenarioId: 's2',
    methodId: 'm3',
    text: 'A/B testing two different placements for the new feature showed a 40% increase in engagement when placed on the main dashboard rather than in a sub-menu.',
    reflection: 'What other elements on the dashboard might be competing for attention?'
  }
];

export const getOutcome = (scenarioId, methodId) => {
  const outcome = outcomes.find(o => o.scenarioId === scenarioId && o.methodId === methodId);
  if (outcome) return outcome;
  return {
    text: `Generic outcome for applying method ${methodId} to scenario ${scenarioId}. The team learned valuable insights about the problem space.`,
    reflection: 'How could this combination be pushed further? What are the limitations?'
  };
};
