import { JsonController, Get, Post, Put, Body, BodyParam, HttpCode, Param, NotFoundError, BadRequestError } from 'routing-controllers'
import Game from './entity'

const randomcolor=['red','blue','green','yellow','magenta']

const defaultBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
  ]

const moves = (board1, board2) => 
board1
.map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
.reduce((a, b) => a.concat(b))
.length

@JsonController()
export default class GameController {

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
    if (!name) throw new NotFoundError('Cannot create game without a name')
    game.name = name
    game.color = randomcolor[Math.floor(Math.random() * randomcolor.length)]
    game.board = defaultBoard
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
    if (color !== undefined && randomcolor.indexOf(color) <0) 
    throw new NotFoundError('Incorrect color')

    const makeMove = moves(game.board, update.board)
    if( makeMove !== 1) throw new BadRequestError('HTTP 400 Bad Request')
    
    update.id = undefined

    return Game.merge(game, update).save()
    }
}