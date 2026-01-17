import prisma from "@/lib/prisma";

export type AuditAction =
    | "CREATE_ITEM"
    | "UPDATE_ITEM"
    | "DELETE_ITEM"
    | "RESTORE_ITEM"
    | "UPDATE_PROFILE";

/**
 * Creates an audit log entry for a user action
 * 
 * @param userId - ID of the user performing the action
 * @param action - Action type (e.g., CREATE_ITEM)
 * @param entityType - Type of entity affected (e.g., Item)
 * @param entityId - ID of the entity affected
 * @param changes - Optional object containing changed data
 */
export async function createAuditLog(
    userId: string,
    action: AuditAction,
    entityType: string,
    entityId: string,
    changes?: Record<string, any>
) {
    try {
        await (prisma as any).auditLog.create({
            data: {
                userId,
                action,
                entityType,
                entityId,
                changes: changes || undefined,
            },
        });
    } catch (error) {
        // We do not want to fail the main request if logging fails, but we should know about it
        console.error("Failed to create audit log:", error);
    }
}
