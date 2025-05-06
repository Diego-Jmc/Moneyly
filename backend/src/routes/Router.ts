import { Router , Request , Response , NextFunction} from "express";
import usersRouter from "./UsersRouter";
import transactionsRouter from "./TransactionsRouter";
const passport = require('passport');

const router = Router();

interface AuthenticatedRequest extends Request {
  isAuthenticated?: () => boolean;
}


function isAuthenticated(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
}
  


// Routes
router.use(isAuthenticated);
router.use(usersRouter);
router.use(transactionsRouter);

export default router;