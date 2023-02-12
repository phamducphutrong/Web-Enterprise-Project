import style from'./Category.module.css'

function Category() {
  return (
    <div className={style.header}>
      <div className={style.logoAndName}>a</div>
      <div className={style.search}>b</div>
      <div className={style.notifyAndDropdown}>c</div>
    </div>
  );
}

export default Category;