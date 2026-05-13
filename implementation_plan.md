# Scenario and Method Generation Refactor

This plan details the updates required to expand the dataset and logic in `src/data/mockData.js` to meet the requirements of a richer design thinking exploration space.

## User Review Required

Please review the expanded list of methods (tools) and ensure the new scenario structures align with your vision. The plan assumes we keep the existing two problem statements ("Medication Adherence" and "Tele-rehabilitation") but dramatically expands their depth, realism, and tool recommendations.

## Open Questions

- Should `generateScenarios` be updated to filter scenarios so they *only* return those matching a specific mock problem statement? Currently, selecting a phase returns scenarios from *all* mock problem statements. I will keep the current behavior unless directed otherwise, as the prompt asks to "preserve existing component logic without breaking navigation."

## Proposed Changes

### mockData.js

We will rewrite `mockData.js` to feature:

1. **Expanded Scenarios (`baseScenarios`)**:
   - 3 Empathise, 3 Analyse, and 3 Ideate scenarios for "Medication Adherence".
   - 3 Empathise, 3 Analyse, and 3 Ideate scenarios for "Tele-rehabilitation".
   - Each scenario will have an 80-120 word `descriptionTemplate` emphasizing realism, emotional constraints, and environmental context.
   - Each scenario will have a `recommendedTools` array with at least 5-6 method IDs.

2. **Expanded Methods (`baseMethods`)**:
   - **Empathise**: Add Cultural Probes, In-Depth Interviews, Focus Groups, Bodystorming.
   - **Analyse**: Add Journey Mapping, Task Analysis, Rose Bud Thorn, Stakeholder Mapping.
   - **Ideate**: Add Brainwriting, Morphological Analysis, Worst Possible Idea, Mind Mapping, Concept Sketching.
   - Ensure all method objects have `id`, `phase`, `title`, `description`, and `whyFits`.

3. **Updated `generateMethods()` logic**:
   - Modify the function to ensure the tools are deduplicated using a `Set`.
   - Ensure the tools returned match the `phase` passed as an argument.
   - Preserve component compatibility.

#### [MODIFY] mockData.js
The new `mockData.js` file will contain an extended array of scenarios, methods, and the updated `generateMethods` function.

## Verification Plan

### Automated/Manual Testing
1. Launch the app and go to the brief step.
2. Select "Empathise" and click Next.
3. Verify that 6 diverse scenarios are presented (3 for Med Adherence, 3 for Rehab).
4. Verify descriptions are 80-120 words and text flows nicely within UI.
5. Select a scenario and proceed to Method Selection.
6. Verify there are >5 methods recommended.
7. Repeat for "Analyse" and "Ideate" phases.
8. Verify no duplicate methods appear in the Method Selection screen.
