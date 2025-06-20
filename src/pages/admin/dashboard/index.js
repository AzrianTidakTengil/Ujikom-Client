import React from "react"
import { withRouter } from "next/router"
import { connect } from "react-redux"

class Dashboard extends React.Component {
    render() {
        return <h1>Ini Dashboard</h1>
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Dashboard))