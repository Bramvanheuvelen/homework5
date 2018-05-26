import { JsonController, Get, Post, Put, Body, BodyParam, HttpCode, Param, NotFoundError } from 'routing-controllers'
import Game from './entity'

const randomcolor=['red','blue','green','yellow','magenta']

@JsonController()
export default class GameController {

    @Get('/games/:id')
    getPage(
    @Param('id') id: number
    ) {
    return Game.findOne(id)
    }

    @Get('/games')
    allGames() {
    const games = Game.find()
    return { games }
    }

    @Post('/games')
    @HttpCode(201)
    createGame(
    @BodyParam("name") name : string
    ){
    const game = new Game()
    game.name = name
    game.color = randomcolor[Math.floor(Math.random() * randomcolor.length)]
    return game.save()
    }

    @Put('/games/:id')
    async updateGame(
    @Param('id') id: number,
    @Body() update: Partial<Game>
    ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')

    const color = update.color
    if (color === null) throw new NotFoundError('Cannot find color')

    return Game.merge(game, update).save()
}
}