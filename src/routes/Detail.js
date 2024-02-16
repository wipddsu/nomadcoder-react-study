import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});
  const getDetail = async () => {
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json/?movie_id=${id}`);
    const json = await response.json();

    setDetail(json.data.movie);
    setLoading(false);
  };
  console.log(detail);
  useEffect(() => {
    getDetail();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <img src={detail.large_cover_image} />
          <h1>
            {detail.title} ({detail.runtime}min)
          </h1>
          <p>
            <span>❤️ {detail.like_count}</span> <span>✅ {detail.rating}</span>
          </p>
          <p>{detail.description_full}</p>
          <a href={detail.url}>See more</a>
        </>
      )}
    </div>
  );
}

export default Detail;
