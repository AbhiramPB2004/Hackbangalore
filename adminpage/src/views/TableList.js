/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useEffect } from "react";
import axios from "axios";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables() {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/getuser")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>loan</th> 
                      <th className="text-center">Salary</th>
                      <th>Approval Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                    {data.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.country}</td>
                        <td>{item.city}</td>
                        <td className="text-center">{item.salary}</td>
                        <td>{item.approvalStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Table on Plain Background</CardTitle>
                <p className="category">Here is a subtitle for this table</p>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-center">loan amount</th>
                      <th>approval status</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Rajesh Raj</td>
                      <td>India</td>
                      <td>Delhi</td>
                      <td className="text-center">₹16,75,800</td>
                      <td> Pending</td>
                    </tr>
                    <tr>
                    <td>Rajesh Raj</td>
                      <td>India</td>
                      <td>Delhi</td>
                      <td className="text-center">₹16,75,800</td>
                      <td> Pending</td>
                    </tr>
                    <tr>
                    <td>Rajesh Raj</td>
                      <td>India</td>
                      <td>Delhi</td>
                      <td className="text-center">₹16,75,800</td>
                      <td> Pending</td>
                    </tr>
                    <tr>
                    <td>Rajesh Raj</td>
                      <td>India</td>
                      <td>Delhi</td>
                      <td className="text-center">₹16,75,800</td>
                      <td> Pending</td>
                    </tr>
                    <tr>
                    <td>Rajesh Raj</td>
                      <td>India</td>
                      <td>Delhi</td>
                      <td className="text-center">₹16,75,800</td>
                      <td> Pending</td>
                    </tr>
                    <tr>
                    <td>Rajesh Raj</td>
                      <td>India</td>
                      <td>Delhi</td>
                      <td className="text-center">₹16,75,800</td>
                      <td> Pending</td>
                    </tr>
                    <tr>
                    <td>Rajesh Raj</td>
                      <td>India</td>
                      <td>Delhi</td>
                      <td className="text-center">₹16,75,800</td>
                      <td> Pending</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
