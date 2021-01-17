import React, { Component } from 'react';
import Customer from './components/Customer';                       // Customer 컴포넌트 불러옴
import './App.css';
import Paper from '@material-ui/core/Paper';                        // paper 최상단 스타일시스 적용
import Table from '@material-ui/core/Table';                        // table
import TableHead from '@material-ui/core/TableHead';                // table head
import TableBody from '@material-ui/core/TableBody';                // table body
import TableRow from '@material-ui/core/TableRow';                  // table row
import TableCell from '@material-ui/core/TableCell';                // table cell
import CircularProgress from '@material-ui/core/CircularProgress';  // progress bar
import { withStyles } from '@material-ui/core/styles';
 
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

/*

React의 Component 라이프 사이클

1) constructor()

2) componentWillMount()

3) render()

4) componentDidMount()

*/

/*

상태관리(비동기)
props or state => shouldComponentUpdate()

*/

// class 변경, 배열데이터를 map함수를 사용하여 컴포넌트에 props로 보냄
class App extends Component {
  // 데이터가 변경 될 수 있으므로 state를 사용하여 customer 변수를 명시
  // 처음에는 데이터가 비어있는 상태
  state = {
    customers: "",  // 리스트 변수 선언(map 반복문에 사용)
    completed: 0    // 정수형 변수 선언(progress bar에 사용)
  }

  // 서버에 접속하여 비동기 방식으로 데이터를 받아오는 역할을 하는 함수 componetDidMount()
  componentDidMount() {
    // timer을 사용하여, 0.02초 마다 progress함수를 호출
    this.timer = setInterval(this.progress, 20);
    // 불러올 api함수 지정
    this.callApi()
      // .then()함수를 통해서 변수의 이름이 res로 변경됨.
      // 반환되어진 json 형태의 고객데이터를 res변수로 받아서 setState를 이용하여 customer에 데이터 갱신함.
      .then(res => this.setState({customers: res}))
      // 에러 발생시 console창에 에러로그를 넣는다.
      .catch(err => console.log(err));
  }

  // api 호출 함수(비동기)
  callApi = async () => {
    // localhost:5000/api/customer 경로에 접근하여 데이터를 response에 담는다.
    // await /api/customers API가 끝나는 것을 기다림(성공/실패와는 상관 없음)
    const response = await fetch('/api/customers');
    // response에 담은 데이터를 json 형태 body에 담는다
    const body = await response.json();
    // body에 담은 json 형태의 고객데이를 반환한다.
    console.log(body);
    return body;
  }

  // progress bar 함수(비동기)
  progress = () => {
    // state 변수 가져온다.
    const { completed } = this.state;
    // completed 변수가 100 되면 0 으로 바꾸고, 그렇지 않으면 + 1을 한다.
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }

  render() {
    // props는 변경 될 수 없는 데이터일 경우 명시
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
            { // state 값으로 변경이 되었기 때문에 this.state.customers... 코드 변경해야됨.
              // this.state.customers에 데이터가 존재하는 경우 데이터 출력, 아닐경우 빈값 노출, 이미지 노출.
              // 반복문을 사용하기 위해 컴포넌트 map을 사용하여 배열데이터 표현
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
              }) :
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>  
    );
  }
}

export default withStyles(styles) (App);
