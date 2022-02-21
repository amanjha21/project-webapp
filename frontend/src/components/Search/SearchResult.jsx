import "./SearchResult.css";
const SearchResult = ({ imgUrl, name, text, onClick }) => {
  const previewText = text.substr(0, 95);
  return (
    <>
      <div className="search-result-container rounded-corner">
        <div className="single-search-result">
          <div className="search-result-profile">
            <img
              className="search-creator-image circle"
              src={imgUrl}
              alt="search profile"
            />
            <span className="search-user-details" onClick={onClick}>
              {name}
            </span>
          </div>
          <div
            className="search-result-details rounded-corner"
            onClick={onClick}
          >
            {previewText} .......
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
