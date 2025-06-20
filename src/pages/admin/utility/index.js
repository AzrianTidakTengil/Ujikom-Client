import React from "react"
import { withRouter } from "next/router"
import { connect } from "react-redux"

class Utility extends React.Component {
    render() {
        return <h1>Ini Utility</h1>
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Utility))