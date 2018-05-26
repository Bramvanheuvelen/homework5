import { JsonController, Get, Param } from 'routing-controllers'
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
}