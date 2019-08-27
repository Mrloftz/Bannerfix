import React from 'react'
import 'antd/dist/antd.css'
import { Table, Popconfirm, Divider, Input } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GetAilrlineAll, GetAirlineList, DeleteAirline } from '../../../_service/bannerMethodApi';

const { Search } = Input
class TableAirline extends React.Component {
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
                title: 'Image',
                dataIndex: 'imageUrl',
                key: 'imageUrl',
            },
            {
                title: 'Url',
                dataIndex: 'link',
                key: 'link',
            },
            {
                title: 'Sort Order',
                dataIndex: 'sortOrder',
                key: 'sortOrder',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <Link to={`/airline/${record.id}`}>
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
        const dataSource = await GetAirlineList()
        this.setState({ dataSource: dataSource.data.airlines})
    }
    handleDelete = async id => {
        await DeleteAirline(id)
        this.setState({
            dataSource: this.state.dataSource.filter(item => item.id !== id)
        })
    }
    handleSearch = async value => {
        const dataSource = await GetAirlineList(value)
        this.setState({ 
            dataSource: dataSource.data.airlines
        })
    }
    render() {
        const columns = this.columns
        return (
            <div>
            <ContainarSub>
              {' '}
              {/* <CreatePageBanner /> */}
              <h1>Airline</h1>
              {/* <BreadCrumb /> */}
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


export default TableAirline