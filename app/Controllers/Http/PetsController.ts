import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Pet from 'App/Models/Pet'

export default class PetsController {
  public async index() {
    // Fetch all rows
    return Pet.all()
  }

  public async store({ request, response }: HttpContextContract) {
    // Create
    const newPetSchema = schema.create({
      name: schema.string({ trim: true }),
    })

    const payload = await request.validate({ schema: newPetSchema })

    const pet = await Pet.create(payload)
    response.status(201)
    return pet
  }

  public async show({ params }: HttpContextContract) {
    // Find by id
    return Pet.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const pet = await Pet.findOrFail(params.id)
    pet.name = body.name
    return pet.save()
  }

  public async destroy({ params, response }: HttpContextContract) {
    const pet = await Pet.findOrFail(params.id)

    await pet.delete()
    // this would return no content
    response.status(204)
  }
}
