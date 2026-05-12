const baseScenarios = [
  // MEDICATION ADHERENCE

  {
    id: 'emp_med_1',
    phase: 'Empathise',
    problemStatement: 'Improving medication adherence for elderly patients living independently',
    title: 'Observing Daily Medication Behavior',
    descriptionTemplate: `An elderly patient living independently often forgets whether medicine has already been taken. Anxiety about overdosing leads to skipped medication and inconsistent routines. Family members are unable to monitor the process closely because they live elsewhere. The situation requires understanding natural medication behavior, emotional stress, and environmental factors influencing adherence.`,
    recommendedTools: ['m_emp_1', 'm_emp_3', 'm_emp_4']
  },

  {
    id: 'emp_med_2',
    phase: 'Empathise',
    problemStatement: 'Improving medication adherence for elderly patients living independently',
    title: 'Understanding Reminder Accessibility',
    descriptionTemplate: `The patient ignores mobile medication reminders because notifications feel stressful and the interface text is difficult to read. Designers must investigate how accessibility barriers affect medication adherence among elderly users.`,
    recommendedTools: ['m_emp_2', 'm_emp_5']
  },

  {
    id: 'ana_med_1',
    phase: 'Analyse',
    problemStatement: 'Improving medication adherence for elderly patients living independently',
    title: 'Synthesizing User Difficulties',
    descriptionTemplate: `Different elderly users report different causes of medication non-adherence including memory loss, poor eyesight, side-effect anxiety, and routine confusion. The design team must organize these insights into meaningful patterns.`,
    recommendedTools: ['m_ana_1', 'm_ana_3']
  },

  {
    id: 'ana_med_2',
    phase: 'Analyse',
    problemStatement: 'Improving medication adherence for elderly patients living independently',
    title: 'Mapping Medication Use Across Situations',
    descriptionTemplate: `Medication routines change during travel, emergencies, and daily home use. Designers need to understand how behavior changes across contexts and moments.`,
    recommendedTools: ['m_ana_4', 'm_ana_5']
  },

  {
    id: 'ide_med_1',
    phase: 'Ideate',
    problemStatement: 'Improving medication adherence for elderly patients living independently',
    title: 'Generating Reminder Concepts',
    descriptionTemplate: `The design team must rapidly generate accessible reminder concepts suitable for low-literacy elderly users while reducing anxiety and confusion.`,
    recommendedTools: ['m_ide_1', 'm_ide_2']
  },

  {
    id: 'ide_med_2',
    phase: 'Ideate',
    problemStatement: 'Improving medication adherence for elderly patients living independently',
    title: 'Prioritizing Key Features',
    descriptionTemplate: `The team needs to determine whether reminders, emergency alerts, caregiver communication, or dosage tracking should become the core product feature.`,
    recommendedTools: ['m_ide_3']
  },

  // TELE REHABILITATION

  {
    id: 'emp_rehab_1',
    phase: 'Empathise',
    problemStatement: 'Enhancing tele-rehabilitation engagement for total knee replacement patients',
    title: 'Understanding Motivation Drop',
    descriptionTemplate: `Patients performing rehabilitation exercises at home lose motivation because the exercises feel repetitive and painful. Engagement drops significantly after the first few weeks of therapy.`,
    recommendedTools: ['m_emp_3', 'm_emp_4']
  },

  {
    id: 'emp_rehab_2',
    phase: 'Empathise',
    problemStatement: 'Enhancing tele-rehabilitation engagement for total knee replacement patients',
    title: 'Remote Therapy Observation',
    descriptionTemplate: `Physiotherapists struggle to determine whether patients are correctly performing exercises during remote rehabilitation sessions.`,
    recommendedTools: ['m_emp_2', 'm_emp_5']
  },

  {
    id: 'ana_rehab_1',
    phase: 'Analyse',
    problemStatement: 'Enhancing tele-rehabilitation engagement for total knee replacement patients',
    title: 'Classifying Rehabilitation Experiences',
    descriptionTemplate: `Different rehabilitation experiences emerge depending on pain tolerance, age, mobility, and support systems available at home.`,
    recommendedTools: ['m_ana_1', 'm_ana_2', 'm_ana_3']
  },

  {
    id: 'ana_rehab_2',
    phase: 'Analyse',
    problemStatement: 'Enhancing tele-rehabilitation engagement for total knee replacement patients',
    title: 'Visualizing Rehabilitation Journey',
    descriptionTemplate: `Designers need to identify which stages of rehabilitation create frustration, disengagement, or emotional resistance.`,
    recommendedTools: ['m_ana_4', 'm_ana_5']
  },

  {
    id: 'ide_rehab_1',
    phase: 'Ideate',
    problemStatement: 'Enhancing tele-rehabilitation engagement for total knee replacement patients',
    title: 'Designing Motivating Exergames',
    descriptionTemplate: `The team wants to develop game-based rehabilitation experiences that motivate movement while minimizing stress and fatigue.`,
    recommendedTools: ['m_ide_1', 'm_ide_2']
  },

  {
    id: 'ide_rehab_2',
    phase: 'Ideate',
    problemStatement: 'Enhancing tele-rehabilitation engagement for total knee replacement patients',
    title: 'Aligning Therapy Goals with Product Features',
    descriptionTemplate: `Designers and engineers need to prioritize rehabilitation goals and align them with technical product capabilities.`,
    recommendedTools: ['m_ide_3']
  }
];

const baseMethods = [
  // EMPATHISE

  {
    id: 'm_emp_1',
    phase: 'Empathise',
    title: 'Fly on the Wall',
    description: 'Observe users naturally without interfering.',
    whyFits: 'This method captures authentic behavior patterns and reveals unnoticed routines or frustrations.'
  },

  {
    id: 'm_emp_2',
    phase: 'Empathise',
    title: 'Contextual Inquiry',
    description: 'Interview users while they perform real tasks.',
    whyFits: 'This method helps uncover contextual barriers and real-world interaction challenges.'
  },

  {
    id: 'm_emp_3',
    phase: 'Empathise',
    title: 'Diary Study',
    description: 'Users document experiences over time.',
    whyFits: 'This method reveals emotional and behavioral changes over long durations.'
  },

  {
    id: 'm_emp_4',
    phase: 'Empathise',
    title: 'Shadowing',
    description: 'Closely follow users during daily activities.',
    whyFits: 'This method helps identify pain points, routines, and workflow breakdowns.'
  },

  {
    id: 'm_emp_5',
    phase: 'Empathise',
    title: 'Survey',
    description: 'Collect quantitative and qualitative responses from many users.',
    whyFits: 'This method helps identify large-scale behavioral and accessibility trends.'
  },

  // ANALYSE

  {
    id: 'm_ana_1',
    phase: 'Analyse',
    title: 'Empathy Mapping',
    description: 'Visualize what users say, think, do, and feel.',
    whyFits: 'This method organizes emotional and behavioral insights into structured understanding.'
  },

  {
    id: 'm_ana_2',
    phase: 'Analyse',
    title: 'Experience Map',
    description: 'Map the full user journey.',
    whyFits: 'This method highlights emotional highs, lows, and friction points across experiences.'
  },

  {
    id: 'm_ana_3',
    phase: 'Analyse',
    title: 'Persona',
    description: 'Create representative user archetypes.',
    whyFits: 'This method helps categorize users according to needs, goals, and behavioral differences.'
  },

  {
    id: 'm_ana_4',
    phase: 'Analyse',
    title: 'Scenario Map',
    description: 'Map how interactions change across contexts.',
    whyFits: 'This method visualizes variations in behavior and environmental situations.'
  },

  {
    id: 'm_ana_5',
    phase: 'Analyse',
    title: 'Storyboarding',
    description: 'Illustrate interactions through sequential visual narratives.',
    whyFits: 'This method helps visualize service flows and identify usability breakdowns.'
  },

  {
    id: 'm_ana_6',
    phase: 'Analyse',
    title: 'Perceptual Mapping',
    description: 'Compare perceptions of competing concepts.',
    whyFits: 'This method helps identify positioning gaps and design opportunity spaces.'
  },

  // IDEATE

  {
    id: 'm_ide_1',
    phase: 'Ideate',
    title: 'Crazy 8s',
    description: 'Rapidly sketch multiple ideas in a short time.',
    whyFits: 'This method encourages divergent thinking and rapid concept exploration.'
  },

  {
    id: 'm_ide_2',
    phase: 'Ideate',
    title: 'SCAMPER',
    description: 'Modify concepts systematically using creative prompts.',
    whyFits: 'This method helps improve and transform existing ideas into innovative alternatives.'
  },

  {
    id: 'm_ide_3',
    phase: 'Ideate',
    title: 'QFD',
    description: 'Translate user needs into technical priorities.',
    whyFits: 'This method aligns customer expectations with engineering requirements.'
  }
];

export const generateScenarios = (brief) => {
  return baseScenarios.filter(
    s => s.phase === brief.phase
  );
};

export const generateMethods = (phase, scenarioId) => {
  const scenario = baseScenarios.find(s => s.id === scenarioId);

  return baseMethods.filter(
    m => scenario?.recommendedTools.includes(m.id)
  );
};

export const getOutcome = (brief, scenarioId, methodId) => {
  const scenario = baseScenarios.find(s => s.id === scenarioId);
  const method = baseMethods.find(m => m.id === methodId);

  return {
    problemStatement: scenario?.problemStatement,
    scenarioTitle: scenario?.title,
    scenarioDescription: scenario?.descriptionTemplate,
    methodTitle: method?.title,
    whyItFits: method?.whyFits,
    reflection:
      'How could the selected method reveal insights that might otherwise remain hidden? What assumptions could this process challenge?'
  };
};