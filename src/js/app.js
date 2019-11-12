// CSS file
import '../scss/app.scss';

/* Import assets */

const cache = {};

function importAll(r) {
  r.keys().forEach((key) => {
    cache[key] = r(key);
  });
}

importAll(require.context('../img', false, /\.(png|svg|jpg|gif)$/));
importAll(require.context('../fonts', false, /\.(woff|woff2|eot|ttf|otf)$/));
