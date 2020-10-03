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

// 데이터 배열 형태로 변경
const customers = [
{
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '홍길동',
  'birthday': '961222',
  'gender': '남자',
  'job': '대학생'
},
{
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '고길동',
  'birthday': '901122',
  'gender': '남자',
  'job': '직장인'
},
{
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '도우너',
  'birthday': '991022',
  'gender': '남자',
  'job': '고등학생'
}
]

// class 변경, 배열데이터를 map함수를 사용하여 컴포넌트에 props로 보냄
class App extends Component {
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
              customers.map(c => {
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
              })
            }
          </TableBody>
        </Table>
      </Paper>  
    );
  }
}

export default withStyles(styles) (App);
