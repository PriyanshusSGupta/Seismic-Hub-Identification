export class IndexController {
    public getIndex(req: Request, res: Response): void {
        res.send('Welcome to my Express app!');
    }
}