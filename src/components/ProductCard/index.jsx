import "./style.css"
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ id ,image, title, count }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hostaldetails/${id}`);
  };
  
  return (
    <div className="accommodation-card" onClick={handleClick}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      {count && <p>{count} disponibles</p>}
    </div>
  );
}