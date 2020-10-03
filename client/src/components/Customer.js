import React from 'react';
import TableRow from '@material-ui/core/TableRow';      //material-ui의 table row 불러옴
import TableCell from '@material-ui/core/TableCell';    //material-ui의 table cell 불러옴

// Customer 클래스는 React.Component로 부터 상속
// 한명의 정보를 두개 항목으로 나누어 계층적 표현
class Customer extends React.Component {
    // 컴포넌트 화면에 그려지는 내용
    render() {
        // 컴포넌트 리턴
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile"/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
            </TableRow>
        )
    }
}

// CustomerProfile 컴포넌트 생성
class CustomerProfile extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.image} alt="profile"/>
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        )
    }
}

// CustomerInfo 컴포넌트 생성
class CustomerInfo extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.birthday}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        )
    }
}
export default Customer;