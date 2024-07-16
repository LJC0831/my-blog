import commonStyle from '../styles/common.module.css';
function loading() {

    return <div className={commonStyle.loading_overlay}>
                <img src="/image/loading.gif" alt="Loading" className={commonStyle.loading_spinner}/>
            </div>
}

export default loading
