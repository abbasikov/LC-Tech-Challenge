process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@/routes/clients.route';
import EventsRoute from '@/routes/events.route';


const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new EventsRoute()]);

app.listen();
