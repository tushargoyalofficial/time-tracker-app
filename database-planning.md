# Schemas

## User
- id (unique)
- name
- email (unique)
- password (hashed)
- createdAt
- updatedAt

## Projects
- id (unique)
- name
- description
- language (code language)
- createdAt
- updatedAt

## Tasks
- id (unique)
- title
- description
- projetId (Project has many tasks relationship)
- createdAt
- updatedAt

## UserProject (Many-to-Many relationship)
- id (unique)
- userId
- projectId
- createdAt
- updatedAt

## TrackedTime
- id (unique)
- date
- hours (hours worked in task)
- taskId (Tasks has many trackedtime relationship)
- createdAt
- updatedAt

