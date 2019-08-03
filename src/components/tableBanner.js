import React from 'react'
import 'antd/dist/antd.css'
import { Table, Popconfirm, Divider, Input } from 'antd'
import styled from 'styled-components'
import { GetBannerAll } from '../_service/bannerMethodApi'
import { getList } from '../_service/bannerMethodApi'
import { Link } from 'react-router-dom'
import { BreadCrumb } from '../components/breadcrumb'
import CreatePageBanner from './createPageBanner'
import { DeleteBanner } from '../_service/bannerMethodApi'
import moment from 'moment'
const { Search } = Input
class TableBanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      pagination: {},
      searchText: '',
    }
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'ImageUrl',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        render: (key, record) => {
          const mainImage = record.bannerTranslations.find(value => value.languageId === 2 || 5)
          return <img src={mainImage ? mainImage.imageUrl : undefined} style={{ width: '100px' }} alt="" />
        },
      },
      {
        title: 'Url',
        dataIndex: 'link',
        key: 'link',
      },
      {
        title: 'Sort Order',
        dataIndex: 'sortOrder',
        key: 'setOrder',
      },
      {
        title: 'lastUpdate',
        dataIndex: 'lastUpdate',
        key: 'lastUpdate',
        render: key => {
          return <div>{moment(key).format('YYYY-MM-DD')}</div>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`/banner/${record.id}`}>
              <label>Edit</label>
            </Link>
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
              <Divider type="vertical" />
              <label>Delete</label>
            </Popconfirm>
          </span>
        ),
      },
    ]
  }
  async componentDidMount() {
    // axios get Data all
    const dataSource = await GetBannerAll()
    this.setState({ dataSource: dataSource.data.data.banners })
  }
  handleDelete = async id => {
    // e.preventDefault()
    await DeleteBanner(id)
    this.setState({ dataSource: this.state.dataSource.filter(item => item.id !== id) })
  }
  handleSearch = async value => {
    //axios get search api
    const dataSource = await getList(value)
    this.setState({ dataSource: dataSource.data.data.banners })
  }
  render() {
    const columns = this.columns
    return (
      <div>
        <ContainarSub>
          {' '}
          <CreatePageBanner />
          <h1>Banner</h1>
          <BreadCrumb />
          <ContainSearch>
            <Search
              style={{ width: '80%', float: 'right', marginRight: '1rem' }}
              placeholder="input search text"
              onSearch={value => this.handleSearch(value)}
              enterButton
            />
          </ContainSearch>
          <TableWrapper
            style={{ marginTop: '2rem' }}
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={{
              showSizeChanger: true,
              position: 'top',
              total: '',
              defaultPageSize: 10,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
            rowKey="id"
          />
        </ContainarSub>
      </div>
    )
  }
}

const ContainarSub = styled.div`
  background: #d6f4fd;
  padding: 2rem;
`
const ContainSearch = styled.div`
  float: right;
`
const TableWrapper = styled(Table)`
  .ant-table {
    overflow-y: scroll;
  }
`
export default TableBanner
