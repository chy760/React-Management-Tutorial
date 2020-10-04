import React, { Component } from 'react';
// Customer 컴포넌트 불러옴
import Customer from './components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

// class 변경, 배열데이터를 map함수를 사용하여 컴포넌트에 props로 보냄
class App extends Component {
  // 데이터가 변경 될 수 있으므로 state를 사용하여 customer 변수를 명시
  // 처음에는 데이터가 비어있는 상태
  state = {
    customers: ""
  }

  // 서버에 접속하여 데이터를 받아오는 역할을 하는 함수 componetDidMount()
  componentDidMount() {
    // 불러올 api함수 지정
    this.callApi()
      // 반환되어진 json 형태의 고객데이터를 res변수로 받아서
      // setState를 이용하여 customer에 넣는다.
      .then(res => this.setState({customers: res}))
      // 에러 발생시 console창에 에러로그를 넣는다.
      .catch(err => console.log(err));
  }

  // 비동기 방식 처리
  callApi = async () => {
    // localhost:5000/api/customer 경로에 접근하여 데이터를 response에 담는다.
    const response = await fetch('/api/customers');
    // response에 담은 데이터를 json 형태 body에 담는다
    const body = await response.json();
    // body에 담은 json 형태의 고객데이를 반환한다.
    return body;
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {// 반복문을 사용하기 위해 컴포넌트 map을 사용하여 배열데이터 표현
              // 데이터가 있을 경우에 노출되며, 데이터가 없을 경우 빈값 노출
              this.state.customers ? this.state.customers.map(c => {
                return (
                  <Customer
                    key={c.id}  // map 사용기 key값은 필수(화면 속도)
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                )
              }) : ""
            }
          </TableBody>
        </Table>
      </Paper>  
    );
  }
}

export default withStyles(styles) (App);
