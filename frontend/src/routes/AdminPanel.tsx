import type React from "react"
import { Link } from "react-router"

export type AdminPanelCategory = "permissions" | "roles" | "users"

export type AdminPanelProps = {
  content: AdminPanelCategory
}

export const AdminPanel: React.FC<AdminPanelProps> = (
  props: AdminPanelProps,
) => {
  const { content } = props
  const adminLink = (category: AdminPanelCategory) => (
    <Link
      to={`/admin/${category}`}
      className={content === category ? "active" : ""}
    >{`${category.charAt(0).toUpperCase()}${category.slice(1).toLowerCase()}`}</Link>
  )
  return (
    <>
      <div className="admin-nav">
        <h3>Admin panel</h3>
        {adminLink("permissions")}
        {adminLink("roles")}
        {adminLink("users")}
      </div>
      <div className="admin-content">
        <p>{`This will display ${content}`}</p>
      </div>
    </>
  )
}
