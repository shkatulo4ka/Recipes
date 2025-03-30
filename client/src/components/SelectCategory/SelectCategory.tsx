import { Select, Form } from 'antd'
import { useGetAllCategoriesQuery } from '../../app/services/categories';
import { Form } from 'react-router-dom';


const SelectCategory = ({}) => {
    const {data} = useGetAllCategoriesQuery();
    const options = data?.map(category => ({
        value: category.id,
        label: category.name
    }))

  return (
    <Select
        style={{width:"27rem", marginBottom: '20px'}}
        // onSelect={handleCategorySelect}
        allowClear={true}
        placeholder="Выбери категорию"
        options={options}
    />
  )
}

export default SelectCategory;
