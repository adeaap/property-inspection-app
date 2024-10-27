import { db } from '@/db'
import type { Inspection, InspectionFinding } from '@/db'
import { v4 as uuidv4 } from 'uuid'

//
// Inspections Table Functions
//

/**
 * Adds a new inspection to the database.
 * @param inspection - Inspection object without the inspectionId.
 * @returns The auto-generated inspectionId.
 */
export async function addInspection(
  inspection: Omit<Inspection, 'inspectionId'>,
): Promise<string> {
  const inspectionObject = {
    ...inspection,
    inspectionId: uuidv4(),
  }
  return await db.inspections.add(inspectionObject)
}

/**
 * Deletes an inspection from the database.
 * @param inspectionId - The ID of the inspection to delete.
 */
export async function deleteInspection(inspectionId: string): Promise<void> {
  await db.inspections.delete(inspectionId)
}

/**
 * Updates an existing inspection.
 * @param inspectionId - The ID of the inspection to update.
 * @param updatedInspection - An object containing the fields to update.
 */
export async function updateInspection(
  inspectionId: string,
  updatedInspection: Partial<Omit<Inspection, 'inspectionId'>>,
): Promise<void> {
  await db.inspections.update(inspectionId, updatedInspection)
}

//
// InspectionFindings Table Functions
//

/**
 * Adds a new inspection finding to the database.
 * @param finding - InspectionFinding object without the findingId.
 * @returns The auto-generated findingId.
 */
export async function addInspectionFinding(
  finding: Omit<InspectionFinding, 'findingId'>,
): Promise<string> {
  return await db.inspectionFindings.add({
    ...finding,
    findingId: uuidv4(),
  })
}

/**
 * Deletes an inspection finding from the database.
 * @param findingId - The ID of the finding to delete.
 */
export async function deleteInspectionFinding(
  findingId: string,
): Promise<void> {
  await db.inspectionFindings.delete(findingId)
}

/**
 * Updates an existing inspection finding.
 * @param findingId - The ID of the finding to update.
 * @param updatedFinding - An object containing the fields to update.
 */
export async function updateInspectionFinding(
  findingId: string,
  updatedFinding: Partial<Omit<InspectionFinding, 'findingId'>>,
): Promise<void> {
  await db.inspectionFindings.update(findingId, updatedFinding)
}
