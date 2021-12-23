 const express = require("express")
 const cors = require("cors")
 const app = express() //iniciando

 const uuid = require("uuid") //criando o id

 

 const porta = 3001 //abrir na posta 3001
 app.use(express.json()) // o programa vai usar json
 app.use(cors())

 //-----------------------------------



 const users=[
 ]

 const checkUserId = (request, response, next)=>{
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({message: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
 }



// --->get  Ver
 app.get('/users', (request, response)=>{
    return response.json(users)

 })
// ---> post   Criar
 app.post('/users', (request, response)=>{
    const {name, age} = request.body

    const user = {
        id:uuid.v4(),
        name, 
        age
    }

    users.push(user)


    return response.status(201).json(user)

 })
 //---> put  Atualizar
 app.put('/users/:id',checkUserId, (request, response)=>{
     const {name, age} = request.body
     const index = request.userIndex
     const id = request.userId

    const updateUser = {
        id: id,
        name,
        age
    }
    
    users[index] = updateUser

    return response.json(updateUser)
 })
 // ---> Delete
 app.delete('/users/:id',checkUserId, (request, response)=>{

    const {id} = request.params
    const index = request.userIndex


    users.splice(index, 1)

    return response.status(204).json()

 })










 //----------------------------Rodando o navegador
 app.listen(porta,()=>{
     console.log("Aplicativo rodando...")
 })