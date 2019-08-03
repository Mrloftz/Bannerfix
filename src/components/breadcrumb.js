import React from 'react'
import { Breadcrumb } from 'antd'

//stateless function
//0.6mb
export const BreadCrumb = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <a href="/">Home</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="/banner">Create Banner</a>
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}
