import { JsonController, Get, Post, Put, Body, HttpCode, Param, NotFoundError } from 'routing-controllers'
import Game from './entity'

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
    @Body() game: Game
    //randomcolor {"red","blue","green","yellow","maganta"}
    ) {
    return game.save()
    }

    @Put('/games/:id')
    async updateGame(
    @Param('id') id: number,
    @Body() update: Partial<Game>
    ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')
    return Game.merge(game, update).save()
}
}