

export type plantype = "weekly" | "monthly"
export type status = "upcomming" | "completed" | "cancelled"

export interface services {
    type: plantype,
    status: status
}