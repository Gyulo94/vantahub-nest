export function formatCategoryName(categoryName: string) {
  let name;
  if (categoryName.includes('-')) {
    name = categoryName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
    return decodeURIComponent(name.trim().replace('-', ' / '));
  } else {
    name = decodeURIComponent(
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
    );
    return decodeURIComponent(name.trim());
  }
}
