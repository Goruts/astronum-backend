import { Controller, Get, Injectable, Res, } from "@nestjs/common";
import type { Response } from "express"

@Controller()
export class AppController {
  @Get("/hello")
  public init(@Res() res: Response) {
    res.send(`Hello World ${process.env.NODE_ENV?.toUpperCase()}`)
  }
}
