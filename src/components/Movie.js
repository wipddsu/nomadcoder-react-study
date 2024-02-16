import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from '../style/Movie.module.css';

function Movie({ id, coverImg, title, summary, genres, rating }) {
  return (
    <div className={style.container}>
      <div>
        <img className={style.img} src={coverImg} alt={title} />
        <div>
          <h2 className={style.title}>
            <Link to={`/movie/${id}`}>{title}</Link>
          </h2>
          <p className={style.rating}>✅ {rating}</p>
          <ul className={style.genre}>
            {genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className={style.story}>{summary}</p>
    </div>
  );
}

Movie.protoTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
