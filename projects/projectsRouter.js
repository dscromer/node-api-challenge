const express = require("express")
const projects = require("../data/helpers/projectModel")

const router = express.Router()

// Get All Projects
router.get("/projects", (req, res) => {
    projects
        .get()
        .then((project) => {
            res.status(200).json(project)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "Could not find projects",
            })
        })
})

// Get Project by ID
router.get("/projects/:id", (req, res) => {
    projects
        .get(req.params.id)
        .then((project) => {
            res.status(200).json(project)
        })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    message: "The project with the specified ID does not exist",
                })
            })
        })

// Get Project Actions by ID
router.get("/projects/:id/actions", (req, res) => {
    projects
        .getProjectActions(req.params.id)
        .then((action) => {
            res.status(200).json(action)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "The action with the specified ID does nto exist"
            })
        })
})

// Add Project
router.post("/projects/:id", (req, res) => {
    projects
        .get()
        .then((project_ => {
            if (!req.body.name || !req.body.description) {
                res.status(400).json({
                    message: "Please fill out all fields",
                })
            } else {
                projects
                    .insert(req.body)
                    .then((project) => {
                        res.status(201).json(project)
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({
                            message: "Error adding the project",
                        })
                    })
            }
        }))
})

// Edit Project
router.put("/projects/:id", (req, res) => {
    projects
        .get(req.params.id)
        .then((project) => {
            if (!req.body.name || !req.body.description) {
                res.status(400).json({
                    message: "Please fill out all fields",
                })
            } else {
                projects
                    .update(req.params.id, req.body)
                    .then((project) => {
                        res.status(201).json(req.body)
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: "The project information could not be updated"
                        })
                    })
            }
        })
})

// Delete project by ID
router.delete("/projects/:id", (req, res) => {
    projects
        .remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "The project has been deleted",
                })
            } else {
                res.status(404).json({
                    message: "The project with the specified ID does not exist",
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "The project could not be removed"
            })
        })
})

module.exports = router