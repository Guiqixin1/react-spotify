import './categories.scss';
const Categories = ({ categoriesList, lastRef }) => {
  return (
    <div className="categories">
      {categoriesList &&
        categoriesList.map((item, index) => {
          return (
            <div
              className="categories__item"
              key={item.id}
              ref={index === categoriesList.length - 1 ? lastRef : null}
            >
              <img
                src={item.icons[0].url}
                alt="pop"
                className="categories__item-img"
              />
              <h1 className="categories__item-title">{item.name}</h1>
            </div>
          );
        })}
    </div>
  );
};
export default Categories;
