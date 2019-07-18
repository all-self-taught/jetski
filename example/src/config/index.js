import App from '../components/App';
import Article from '../containers/Article';
import NewArticle from '../containers/NewArticle';

export default {
  global: {
    "BASE_URL": 'http://localhost:8080'
  },
  pages: [
    {
      route: {
        path: '/',
        component: App,
        exact: true
      },
      submit: {
        url: '/articles',
        method: 'GET',
        name: 'news'  
      }
    },
    {
      route: {
        path: '/new',
        component: NewArticle,
      },
      submit: {
        url: '/articles/new',
        method: 'POST',
        name: 'news'
      }
    },
    {
      route: {
        path: '/:id',
        component: Article,
      },
      load: [
        {
          url: '/articles/:id',
          method: 'GET',
          name: 'news'
        }
      ]
    }
  ]
}