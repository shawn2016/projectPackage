import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
const logoImg = require('assets/images/logo.png')

class OnlineProtocol extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {}
  }
  static propTypes = {
    history: PropTypes.object
  }
  static defaultProps = {
    history: {}
  }
  /**
   * 同意协议 并跳转到注册
  */
  goSelectRegister = () => {
    this.props.history.push('/selectRegister')
  }
  /**
   * 决绝协议 并跳转到登陆
  */
  goLogin = () => {
    this.props.history.push('/login')
  }
  render() {
    return (
      <div>
        <div className="header">
          <div className="rob-container">
            <div className="qb-header-g qb-header-g__bg">
              <Link className="qb-header-g__logo" to="/login">
                <img src={logoImg} alt="" />
              </Link>
              <span className="qb-greet-g fs16">欢迎注册</span>
              <div className="qb-pull-right-g qb-greet-g mr40">已有账号？去<Link className="qb-red-g fs14" to="/login">登录</Link></div>
            </div>
          </div>
        </div>
        <div className="qb-agreement-g qb-agreement-g__bd">
          <h5 className="qb-agreement-g__title">融数钱包用户注册服务协议</h5>
          <div className="rob-container">
            <div className="qb-agreement-g__ag-content">
              <div className="qb-agreement-g__ag-content--segment">
                  在注册前，敬请您阅读以下内容。在进行注册过程中，点击 “我已阅读” 按钮即表示用户您完全接受本协议项下的全部条款。
        </div>

              <div className="qb-agreement-g__ag-content--segment">
                  融数钱包是由北京融数沃雷特科技服务有限公司（以下统称为 “融数” ）以及与其合作的银行或第三方支付公司，向用户（以下简称 “您” ）提供综合金融服务的网络系统（以下简称 “本系统” ），本协议由您和融数签订。
        </div>
              <h3>第一条 声明与承诺</h3>
              <div className="qb-agreement-g__ag-content--segment">1. 本协议已对与您的权益有或可能具有重大关系的条款，及对融数具有或可能具有免责或限制责任的条款用粗体字予以标注，请您注意。您确认，在您注册成为融数钱包用户或您实际使用本服务前，您已充分阅读、理解并接受本协议的全部内容，一旦您使用本服务，即表示您同意遵循本协议之所有约定。
        </div>
              <div className="qb-agreement-g__ag-content--segment">2. 您同意，融数有权随时对本协议内容进行单方面的变更，并以在融数钱包系统公告的方式予以公布，无需另行单独通知您；若您在本协议内容公告变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的协议内容，也将遵循修改后的协议内容使用本服务；若您不同意修改后的协议内容，您应立即停止使用本服务。
        </div>
              <div className="qb-agreement-g__ag-content--segment">3. 您保证，在您同意接受本协议并注册成为融数钱包用户时，您已经年满18周岁且为完全民事行为能力人，或者是根据中国法律成立并存续的企业法人；本协议内容不受您所属国家或地区法律的排斥。不具备前述条件的，您应立即终止注册或停止使用本服务。您在使用融数钱包服务时，应自行判断对方是否具有完全民事行为能力及完整的履约能力，并自行决定是否与对方进行交易或转账给对方等，且您应自行承担与此相关的所有风险。
        </div>
              <div className="qb-agreement-g__ag-content--segment">4. 您同意并授权融数钱包可在本合同约定用途的范围内获取您的相关信息（包括但不限于注册及使用融数钱包而提供或发生的企业或身份信息、交易信息、行为信息、账户相关信息等）并将上述信息进行保存、加工、整理等。
        </div>
              <div className="qb-agreement-g__ag-content--segment">5. 您确认，您使用融数钱包服务时，将完全遵守《融数钱包用户注册服务协议》及其他融数钱包系统公告的各项规则及页面提示等。
        </div>
              <h3>第二条 定义及解释</h3>

              <div className="qb-agreement-g__ag-content--segment">1. 融数钱包账户：是融数向您提供的唯一编号。您可自行为该融数钱包账户设置密码，并用以查询您的账户信息。您必须使用本人电子邮箱或手机号码或者融数允许的其它方式作为登录手段登录该融数钱包账户（以下可称为 “该账户” ）。
        </div>
              <div className="qb-agreement-g__ag-content--segment">2. 融数商家：是指根据中国法律成立并存续的企业法人，为融数钱包的法人用户并入驻融数钱包系统并为您提供具体服务，且通过融数钱包系统向您支付、收取相应款项的商家，以下简称为 “融数商家” 。
        </div>
              <div className="qb-agreement-g__ag-content--segment">3. 冻结：指本协议第四条2款2.8项规定的有权机关要求的冻结。冻结资金为暂时不可用状态，被冻结账户暂时不可登录、使用。</div>
              <h3>第三条 融数钱包服务</h3>
              <div className="qb-agreement-g__ag-content--segment">
                  1. 融数钱包服务：即融数及与其合作的银行或第三方支付公司向您提供的服务，其中包含：

        </div>
              <div className="qb-agreement-g__ag-content--segment">
                <b> 1.1 入金：您可以使用本服务指定的方式（包括但不限于使用您个人名下的银行卡）向您的融数钱包账户充值，并授权融数委托与其合作的银行或第三方支付公司代为保管。保管期间您将不享有任何孳息。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment">1.2 代收：您可以要求并授权融数及与其合作的银行或第三方支付公司代为收取融数商家向您支付的各类款项。
        </div>
              <div className="qb-agreement-g__ag-content--segment">1.3 代付：您可以要求并授权融数及与其合作的银行或第三方支付公司将您在融数钱包账户中的款项支付给您指定的收款方的账户。您同意，融数及与其合作的银行或第三方支付公司代付后，非经法律程序或者非依本协议之约定，该支付是不可逆转的。</div>
              <div className="qb-agreement-g__ag-content--segment">1.4 出金：您可以要求融数及与其合作的银行或第三方支付公司向您支付您在融数钱包账户中的款项。当您向融数发出出金指令时，必须提供一个与您的身份或企业名称完全相符且有效的中国大陆银行账户，并且该银行账户必须与您充值时所提供的银行账户保持一致，<b>融数及与其合作的银行或第三方支付公司将于收到指令后的一至五个工作日内，将相应的款项汇入您提供的有效银行账户（根据您提供的银行不同，会产生汇入时间上的差异）。</b>除本条约定外，融数不接受其他出金方式。您理解并同意您最终收到款项的服务是由您提供的银行账户对应的银行提供的，您需向该银行请求查证。
        </div>
              <div className="qb-agreement-g__ag-content--segment">1.5 查询：您可以在融数钱包账户中查询您的交易记录、账单记录等所有操作记录，不论该操作之目的最终是否实现。<b>您认为记录有误的，您可要求融数向您提供已按照您的指令所执行的相关资料。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment">
                <b>1.6 款项归属：对您充值至您融数钱包账户的款项及您通过融数钱包账户收到的款项，均归属您所有，上述款项将由您授权融数委托的银行或第三方支付公司予以妥善保管，并由该银行或第三方支付公司在您发出指令的前提下进行代收、代付和出金操作，除本协议另行规定外，不作任何其他用途。</b>

              </div>
              <div className="qb-agreement-g__ag-content--segment">
                2. 转账服务：是指收付款双方使用本系统，在付款方向本系统指示收款方融数钱包账户和转账金额后,将付款方融数钱包账户内指定金额的款项划转至收款方融数钱包账户的一种资金转移服务。<b>融数提示您注意：该项转账服务适用于您与收（付）款方彼此都有充分了解。在您使用转账服务指示转出资金时，您所转出的款项将进入您向本系统指示的收款方的融数钱包账户。基于此项服务可能存在的风险，在使用转账服务时，您理解并接受：</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment"><b>2.1 为控制可能存在的风险，融数对所有用户使用转账服务时的转账款项的每天转账最高限额以及每笔转账最高限额进行了限制，并保留对限额进行调整的权利。</b></div>
              <div className="qb-agreement-g__ag-content--segment"><b>2.2 您可能收到由于其他付款方指示错误（失误）而转账到您融数钱包账户的款项，在此情况下您应该根据国家的相关法律的规定和实际情况处理收到的该笔款项。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment"><b>2.3使用转账服务是基于您对转账对方的充分了解（包括但不限于对方的真实身份及确切的融数钱包账户名等），一旦您选用转账服务进行转账，您应当自行承担因您指示错误（失误）而导致的风险。融数依照您指示的收款方并根据本协议的约定完成转账后，即完成了当次服务的所有义务，对于收付款双方之间产生的关于当次转账的任何纠纷不承担任何责任，也不提供任何形式的纠纷解决途径，您应当自行处理相关的纠纷。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment"><b>3．在您使用上述代收、代付、转账等服务时，融数有权依据《融数钱包服务收费规则》向您收取相关费用。融数保留向您收取上述相关费用的权利，并有权随时调整上述费用，具体费用以您使用本服务时融数钱包系统上所列之收费方式与数额的公告为准。</b>
                <h3>第四条 融数钱包账户</h3>
              </div>
              <div className="qb-agreement-g__ag-content--segment">1. 注册相关</div>
              <div className="qb-agreement-g__ag-content--segment">您须在融数钱包App（或手机网站）直接注册并取得融数提供给您的融数钱包账户。您同意：
        </div>
              <div className="qb-agreement-g__ag-content--segment">1.1 应按照融数钱包要求准确提供并在取得该账户后及时更新您正确、最新及完整的企业或身份信息及相关资料。若融数有合理理由怀疑您提供的企业或身份信息及相关资料错误、不实、过时或不完整的，融数有权暂停或终止向您提供部分或全部融数钱包服务。融数对此不承担任何责任，且您将承担因此产生的任何直接或间接支出。另外，若因国家法律法规、部门规章或监管机构的要求，融数需要您补充提供任何相关资料时，如您不能及时配合提供，融数有权暂停或终止向您提供部分或全部融数钱包服务。
        </div>
              <div className="qb-agreement-g__ag-content--segment">1.2 您应当准确提供并及时更新您提供的电子邮件地址、联系电话、联系地址、邮政编码等联系方式，以便融数与您进行及时、有效联系。您应完全独自承担因通过这些联系方式无法与您取得联系而导致的您在使用本服务过程中遭受的任何损失或增加任何费用等不利后果。您理解并同意，您有义务保持您提供的联系方式的有效性，如有变更，您应按融数的要求进行更新操作。
        </div>
              <div className="qb-agreement-g__ag-content--segment">1.3 因您未及时更新资料（包括但不限于身份证、户口本、护照等证件或其他身份证明文件或企业营业执照、联系方式、与融数钱包账户绑定的邮箱、手机号码等），导致本服务无法提供或提供时发生任何错误，您不得将此作为取消交易、拒绝付款的理由，您将承担因此产生的一切后果，融数不承担任何责任。
            1.4 您应对您的融数钱包账户负责，只有您本人可以使用您的融数钱包账户。
        </div>
              <div className="qb-agreement-g__ag-content--segment">1.5您同意，若您丧失全部或部分民事权利能力或民事行为能力，融数有权根据有效法律文书（包括但不限于生效的法院判决、生效的遗嘱等）处置与您的融数钱包账户相关的款项。</div>
              <div className="qb-agreement-g__ag-content--segment">2. 账户安全</div>
              <div className="qb-agreement-g__ag-content--segment">您将对使用该账户及密码进行的一切操作及言论负完全的责任，您同意：
        </div>
              <div className="qb-agreement-g__ag-content--segment">2.1 融数通过您的融数钱包登录名和密码识别您的指示，您应当妥善保管您的融数钱包登录名和密码及身份信息，对于因密码泄露、身份信息泄露所致的损失，由您自行承担。您保证不向其他任何人泄露您的融数钱包登录名及密码以及身份信息，亦不使用其他任何人的融数钱包登录名及密码。融数亦可能通过您注册时作为该账户名称或者与该账户绑定的手机或其他通讯设备识别您的指示，您应当妥善保管处于您或应当处于您掌控下的这些产品或设备，对于这些产品或设备遗失所致的任何损失及后果，由您自行承担。
        </div>
              <div className="qb-agreement-g__ag-content--segment">2.2 您同意，如您发现有他人冒用或盗用您的融数钱包登录名及密码或任何其他未经合法授权之情形时，应立即以有效方式通知融数，要求融数暂停相关服务。您理解融数对您的请求采取行动需要合理期限，在此之前，融数对已执行的指令及(或)所导致的您的损失不承担任何责任。
        </div>
              <div className="qb-agreement-g__ag-content--segment">2.3 除非有法律规定或司法裁判，否则您的融数钱包登录名及密码、融数钱包账户不得以任何方式转让、赠与或继承（相关的财产权益除外）。
        </div>
              <div className="qb-agreement-g__ag-content--segment">2.4 交易异常处理：您同意并认可，除了系统公告的维修时间外，可能由于银行或第三方支付公司本身系统问题、银行或第三方支付公司相关作业网络连线问题或其他不可抗拒因素，造成本服务无法使用或及时提供的异常情况。您应确保您在融数钱包账户所提供的联系资料正确、最新及完整无误，否则因联系资料不完整或错误，而导致无法及时通知您交易异常状况及后续处理方式的，融数不承担任何损害赔偿责任。
        </div>
              <div className="qb-agreement-g__ag-content--segment">2.5 您同意，基于运行和交易安全的需要，融数可以暂时停止提供或者限制本服务部分功能，或提供新的功能。在任何功能减少、增加或者变化时，只要您仍然使用本服务，表示您仍然同意本协议或者变更后的协议。
        </div>
              <div className="qb-agreement-g__ag-content--segment">2.6 融数有权了解您使用融数产品或服务的真实交易背景及目的，您应如实提供融数所需的真实、全面、准确的信息；如果融数有合理理由怀疑您提供虚假企业或身份资料或虚假交易信息的，融数有权暂时或永久限制您的钱包账户的全部或部分功能或所使用的产品或服务的部分或全部功能。
        </div>
              <div className="qb-agreement-g__ag-content--segment">2.7 您同意，为了您的融数钱包账户及其内资金的安全，根据本协议的约定、法律法规及法律文书的规定、政府依行政职权的要求及融数认为可能对您的融数钱包账户产生风险的情况，融数有权对您名下的全部或部分融数钱包账户进行冻结，即进行暂时关闭这些账户部分或全部使用权限的操作。冻结的逆过程为解冻，即融数对被冻结的融数钱包账户结束冻结。当冻结发生时，如您申请解冻，融数有权根据冻结原因自行判断是否允许全部或部分解冻，您应充分理解您的解冻申请并不必然被允许，且申请解冻时您应当配合融数核实您的身份及交易的有关要求，提供包括但不限于身份信息、身份证、护照、其他有效的身份证明文件或企业营业执照及融数要求的其他信息或文件。</div>
              <div className="qb-agreement-g__ag-content--segment">2.8 您同意，融数有权配合并按照（包括但不限于公安机关、检察机关、法院、海关、税务机关等司法机关、行政机关、军事机关等）国家机关所提供的行政或法律文书，对您在融数钱包的资金及账户进行查询、冻结或扣划等。
        </div>
              <div className="qb-agreement-g__ag-content--segment">3. 注销相关</div>
              <div className="qb-agreement-g__ag-content--segment">3.1您理解并同意，如（a）您连续36个月未使用您的融数钱包登录名或融数认可的其他方式登录过融数APP或手机网站；或（b）您在使用融数提供的钱包服务过程中存在违法、欺诈、侵犯他人合法权益，或出现其他严重违反本合同及融数公告的任一规则的行为的，融数有权注销您名下的融数钱包账户，所有服务将同时终止。融数及与其合作的银行或第三方支付机构会将您滞留在这些账户内的全部合法资金（如有）退回至您绑定的银行卡的银行账户。融数将会采取电话或邮件或者短信等方式通知您，但融数不保证您能够收到或者及时收到该邮件（或发送到该手机的短信或电话等），且融数不对此承担任何后果及赔偿责任。
        </div>
              <div className="qb-agreement-g__ag-content--segment">3.2 融数钱包账户一旦注销成功，将不再予以恢复。
        </div>
              <h3>第五条 融数钱包服务使用规则</h3>
              <div className="qb-agreement-g__ag-content--segment">为有效保障您使用本服务时的合法权益，您理解并同意接受以下规则：
        </div>
              <div className="qb-agreement-g__ag-content--segment">1. 一旦您使用本服务，您即授权融数委托与其合作的银行或第三方支付机构，在符合您发出的指定条件或状态时，代为支付款项给您指定的收款人，或代为收取您指定的付款人支付给您的款项。
        </div>
              <div className="qb-agreement-g__ag-content--segment">2. 融数通过以下三种方式接受并验证来自您的指令：其一，在网站或其他可使用本服务的网站或软件上以您的融数钱包账户名及密码或数字证书等安全产品登录融数钱包账户并依照本服务预设流程所修改或确认的交易状态或指令；其二，通过您注册时作为该账户名称或者与该账户绑定的手机或其他专属于您的通讯工具（以下合称该手机）号码向本系统发送的信息（短信或电话等）回复；其三，通过您注册时作为该账户名称或者与该账户名称绑定的其他硬件、终端、软件、代号、编码、代码、其他账户名等有形体或无形体向本系统发送的信息（如本方式所指有形体或无形体具备与该手机接受信息相同或类似的功能，以下第五条第3、4、5款和第六条第3款涉及该手机的条款同样适用于本方式）。无论通过以上任一种方式向融数发出指令，均视为您本人的指令，都不可撤回或撤销，且成为融数及与其合作的银行或第三方支付机构代您支付或收取款项或进行其他账户操作的唯一指令，您应当自己承担融数及与其合作的银行或第三方支付机构忠实执行上述指令而产生的任何结果。本协议所称绑定，指您的融数钱包账户与本条上述所称有形体或无形体存在对应的关联关系，这种关联关系使得融数钱包服务的某些服务功能得以实现，且这种关联关系有时使得这些有形体或无形体能够作为本系统对您的融数钱包账户的识别和认定依据。除本协议另有规定外，您与第三方发生交易纠纷时，您授权融数及与其合作的银行或第三方支付机构有权根据您提交的申请书和相关证明材料以及融数商家的回复自行判断并决定将争议款项的全部或部分支付给交易一方或双方
        </div>
              <div className="qb-agreement-g__ag-content--segment">3. 您使用本服务即表示您同意接受本服务的相关规则。您了解并同意融数有权单方修改服务的相关规则，而无须征得您的同意，服务规则应以本协议内容、网页（客户端）上出现的关于交易操作的提示或您使用服务时的页面提示（或发送到该手机的短信或电话等）为准，您同意并遵照服务规则是您使用本服务的前提。
        </div>
              <div className="qb-agreement-g__ag-content--segment">4. 融数会以电子邮件（或发送到该手机的短信或电话等）方式通知您交易进展情况以及提示您进行下一步的操作，但融数不保证您能够收到或者及时收到该邮件（或发送到该手机的短信或电话等），且不对此承担任何后果，因此，在交易过程中您应当及时登录到本网站查看和进行交易操作。因您没有及时查看和对交易状态进行修改或确认或未能提交相关申请而导致的任何纠纷或损失，融数不负任何损害赔偿责任。
        </div>
              <div className="qb-agreement-g__ag-content--segment">5. 融数对您所交易的标的物不提供任何形式的鉴定、证明的服务。除本协议另有规定外，如您与交易对方发生交易纠纷，您同意融数有权根据本协议及融数钱包上载明的各项规则进行处理。您为解决纠纷而支出的通讯费、文件复印费、鉴定费等均由您自行承担。因市场因素致使商品涨价跌价而使任何一方得益或者受到损失而产生的纠纷，融数不予处理。
        </div>
              <div className="qb-agreement-g__ag-content--segment">6. 融数会将与您融数钱包账户相关的资金，委托独立的银行或第三方支付公司保管，且不会将该资金用于非您指示的用途。
        </div>
              <div className="qb-agreement-g__ag-content--segment">7. 融数并非银行或其它金融机构，本协议项下的资金移转均通过第三方支付公司和银行来实现，你理解并同意您的资金于流转途中需要合理时间。
        </div>
              <div className="qb-agreement-g__ag-content--segment">8. 您确认并同意，您应自行承担在您使用本服务期间由融数委托与其合作的银行或第三方支付机构保管或代收或代付款项的货币贬值风险，并且融数及与其合作的银行或第三方支付机构无须就此等款项向您支付任何孳息或其他对价。
        </div>
              <div className="qb-agreement-g__ag-content--segment">9. 在您注册及使用融数钱包的过程中，基于交易安全的需要，您授权融数通过银行或向第三者审核您的身份和资格，并授权融数可自己或通过其它合作方取得关于您使用本服务的相关资料。
        </div>
              <div className="qb-agreement-g__ag-content--segment">10. 您应遵守本服务的使用规则，不得将本服务用于非融数许可的其他用途，包括但不限于利用本服务从事违法、欺诈、侵犯他人合法权益等活动。
        </div>
              <div className="qb-agreement-g__ag-content--segment">11. 交易风险
        </div>
              <div className="qb-agreement-g__ag-content--segment">11.1 在使用本服务时，若您或您的交易对方未遵从本协议条款或融数钱包系统中的说明、交易页面中之操作提示、规则等，则融数有权拒绝为您与交易对方提供相关服务，且融数不承担损害赔偿责任。若发生上述状况，而款项已先行划付至您或他人的融数钱包账户名下，您同意并授权融数有权直接自相关账户中扣回款项及（或）禁止您对此笔款项发起出金之权利。若此款项已出金成功并汇入您绑定银行卡的银行账户，您同意融数有向您事后索回之权利，因您的原因导致融数事后追索的，您应当承担融数因此发生的合理的追索费用。
        </div>
              <div className="qb-agreement-g__ag-content--segment">11.2 因您的过错导致的任何损失由您自行承担，该过错包括但不限于：不按照交易提示操作，未及时进行交易操作，遗忘或泄漏密码，密码被他人破解，您使用的计算机被他人侵入。
        </div>
              <h3>12. 服务费用</h3>
              <div className="qb-agreement-g__ag-content--segment"><b> 12.1 在您使用本服务时，融数有权依照《融数钱包服务收费规则》向您收取服务费用。融数拥有制订及随时调整服务费之权利，具体服务费用以您使用本服务时融数钱包系统上所列之收费方式与数额的公告或您与融数达成的其他书面协议为准。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment"><b>12.2 除非另有说明或约定，您同意并授权融数有权自您在融数委托的银行或第三方支付机构所代管、代收或代付的款项中直接扣除上述服务费用。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment">13. 本服务所涉及到的任何款项只以人民币计结，不提供任何形式的结售汇业务。
        </div>
              <h3>第六条 融数钱包服务使用限制</h3>
              <div className="qb-agreement-g__ag-content--segment"><b>1. 您在使用本服务时应遵守中华人民共和国相关法律法规，不将本服务用于任何非法目的（包括用于禁止或限制交易物品的交易），也不以任何非法方式使用本服务。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment"><b>2. 您不得利用本服务从事侵害他人合法权益之行为，否则融数有权拒绝提供本服务，且您应承担所有相关法律责任。若因此导致融数或融数雇员受损的，您还应承担赔偿责任。上述行为包括但不限于：</b></div>
              <div className="qb-agreement-g__ag-content--segment"><b>2.1 侵害他人名誉权、隐私权、商业秘密、商标权、著作权、专利权等合法权益。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment"><b>2.2 违反依法定或约定之保密义务。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment"><b>2.3 冒用他人名义使用本服务。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment"><b>2.4 从事不法交易行为，如洗钱、恐怖融资、贩卖枪支、毒品、禁药、盗版软件、黄色淫秽物品、其他融数认为不得使用本服务进行交易的物品等。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment"><b>2.5 提供赌博资讯或以任何方式引诱他人参与赌博。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment"><b>2.6 非法使用他人银行账户（包括信用卡账户）或无效银行账号（包括信用卡账户）交易。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment"><b>2.7 违反《银行卡业务管理办法》使用银行卡，或利用信用卡套取现金（以下简称套现）。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment"><b>2.8 进行与您或交易对方宣称的交易内容不符的交易，或不真实的交易。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment"><b>2.9 从事任何可能含有电脑病毒或是可能侵害本服务系统、资料之行为。</b>
              </div>
              <div className="qb-agreement-g__ag-content--segment">2.10 其他融数有正当理由认为不适当之行为。
        </div>
              <div className="qb-agreement-g__ag-content--segment">3. 您理解并同意，融数不对因下述任一情况所导致的任何损害承担赔偿责任，包括但不限于利润、商誉、使用、数据等方面的损失或其他无形损失（无论融数是否已被告知该等损害赔偿的可能性）：</div>
              <div className="qb-agreement-g__ag-content--segment">3.1 融数有权基于单方判断，包含但不限于融数认为您涉嫌或已经违反本协议的明文规定及原则，对您的名下的全部或部分融数钱包账户做出暂停、注销的处置或终止向您提供本服务全部或部分功能，并移除您的资料。</div>
              <div className="qb-agreement-g__ag-content--segment">3.2 融数在发现异常交易或有疑义或认为有可能违反法律规定或本协议约定之情形时，有权不经通知先行暂停或终止您名下全部或部分融数钱包账户的使用（包括但不限于对这些账户名下的在途交易采取暂停交易等限制措施），并暂时拒绝向您提供本服务之部分或全部功能。融数之后将会采取电话或邮件或者短信等方式通知您，但融数不保证您能够收到或者及时收到该邮件（或发送到该手机的短信或电话等），且融数不对此承担任何后果及赔偿责任。</div>
              <div className="qb-agreement-g__ag-content--segment">3.3 您理解并同意：在您使用本协议项下或您与融数另行签署协议中的相关产品或服务的过程中，融数有权基于单方面判断认为您的使用行为存在异常时，包括但不限于您收入或支付的款项金额以及/或操作频次不同于往常，或您使用融数钱包的行为涉嫌违反国家相关法律法规、部门规章等，可以暂时冻结您的名下全部或部分融数钱包账户，或暂停执行您基于您名下全部或部分融数钱包账户发送的部分或全部指令。如果融数暂时冻结账户或暂停执行您的指令，融数将会采取电话或邮件或者短信等方式通知您，但融数不保证您能够收到或者及时收到该邮件（或发送到该手机的短信或电话等），且融数不对此承担任何后果及赔偿责任。在融数认为该等异常已经得到合理解释或有效证据支持或未违反国家相关法律法规及部门规章的情况下，最晚将于冻结账户或暂停执行指令之日起的30个日历天内解除冻结或恢复执行指令。但融数有进一步理由相信该等异常仍可能对您或其他用户或融数造成损失的情形除外，包括但不限于（a）收到针对该等异常的投诉；（b）您已经实质性违反了本协议或另行签署的服务协议，且我们基于保护各方利益的需要必须继续冻结账户或暂停执行指令；
        </div>
              <div className="qb-agreement-g__ag-content--segment">3.4 在必要时，融数无需事先通知即可终止提供本服务，并暂停、关闭或删除您名下全部或部分融数钱包账户及这些账户中所有相关资料及档案，并将您滞留在这些账户的全部合法资金退回到您绑定的银行卡的银行账户中。
        </div>
              <div className="qb-agreement-g__ag-content--segment">4. 若融数注销您的账户，即表明融数与您之间的协议已终止，但您仍应对您使用本服务期间的行为承担可能的违约或损害赔偿责任。
        </div>
              <h3>第七条 隐私权保护
        </h3>
              <div className="qb-agreement-g__ag-content--segment">一旦您同意本协议或使用本服务，您即同意并授权融数按照以下条款来使用和披露您的个人信息：
        </div>
              <div className="qb-agreement-g__ag-content--segment">1. 融数钱包登录名和密码
            在您注册融数钱包账户及服务时，融数会要求您设置融数钱包登录名和密码来识别您的身份，以便在您丢失密码时可以用您的登录名来确认您的身份并重置密码。您仅可通过您设置的密码来使用该账户，如果您泄漏了密码，您可能会丢失您的个人识别信息，并可能导致对您不利的法律及经济后果。该账户和密码因任何原因受到潜在或现实危险时，您应该立即和融数取得联系，在融数采取行动前，融数对因此发生的任何损失不负任何赔偿责任。

        </div>
              <div className="qb-agreement-g__ag-content--segment">2. 注册信息
            您注册时应提供您的真实姓名或企业名称、地址、国籍、电话号码和电子邮件地址等信息，您还可以选择填写相关附加信息（包括但不限于您公司所在的省份和城市、时区和邮政编码、传真号码、个人主页和您的职务）。为有针对性地向您提供新的服务和机会，您了解并同意融数及其关联公司或您登录的其他网站将通过您的联系方式（包括但不限于手机、电子邮件、融数钱包客户端、融数钱包站内信等）向您发送相关通知及其他商业性电子信息。
        </div>
              <div className="qb-agreement-g__ag-content--segment">3. 银行账户信息
            融数及与其合作的银行或第三方支付机构所提供的服务将需要您提供您的银行账户信息，在您提供相应信息后，融数将严格履行相关保密约定。</div>
              <div className="qb-agreement-g__ag-content--segment">4. 交易行为
            为了保障您使用本服务的安全以及不断改进服务质量，融数将记录并保存您登录和使用本服务的相关信息，但融数承诺不将此类信息提供给任何第三方（除双方另有约定或法律法规另有规定外）。</div>
              <div className="qb-agreement-g__ag-content--segment">5. 您同意并授权融数可对融数钱包用户的相关数据进行综合统计（包括但不限于用户数量、性别、所在区域、交易额等），并出于推广的需要而使用或披露。
        </div>
              <div className="qb-agreement-g__ag-content--segment">6. 为更为有效地向您提供服务，您同意并授权，融数有权将您注册及使用本服务过程中所提供、形成的信息提供给融数及其关联公司和本协议约定的银行或第三方支付机构等合作公司。同时，出于交易安全的目的，在融数需要识别您的身份，或融数认为您的账户存在风险时，融数有权要求您提交身份信息（包括但不限于身份证、户口本、护照或企业营业执照等证件或其他文件）。除本协议另有规定外，融数不对外公开或向第三方提供您的信息（包括但不限于企业或身份信息、交易信息、行为信息、账户信息等），但以下情况除外：
        </div>
              <div className="qb-agreement-g__ag-content--segment">6.1 事先获得您的明确授权；
        </div>
              <div className="qb-agreement-g__ag-content--segment">6.2 只有披露您的个人资料，才能提供您需要的产品和（或）服务；
        </div>
              <div className="qb-agreement-g__ag-content--segment">6.3 按照本协议的约定或要求而进行的使用、披露；
        </div>
              <div className="qb-agreement-g__ag-content--segment">6.4根据法律法规的规定；
        </div>
              <div className="qb-agreement-g__ag-content--segment">6.5按照政府主管部门的要求；
        </div>
              <div className="qb-agreement-g__ag-content--segment">6.6为维护融数及其关联公司、银行或第三方支付机构等合作公司的合法权益；
        </div>
              <div className="qb-agreement-g__ag-content--segment">6.7您使用融数钱包账户成功登录过的其他网站；
        </div>
              <div className="qb-agreement-g__ag-content--segment">6.8对您身份真实性进行验证。
        </div>
              <h3>第八条 安全
        </h3>
              <div className="qb-agreement-g__ag-content--segment">融数仅按现有技术提供相应的安全措施来使融数掌握的信息不丢失，不被滥用和变造。这些安全措施包括向其它服务器备份数据和对用户密码加密。尽管有这些安全措施，但融数不保证这些信息的绝对安全。
        </div>
              <h3>第九条 系统中断或故障
        </h3>
              <div className="qb-agreement-g__ag-content--segment">系统因下列状况无法正常运作，使您无法或及时使用各项服务时，融数不承担损害赔偿责任，该状况包括但不限于：
        </div>
              <div className="qb-agreement-g__ag-content--segment">1. 融数在融数钱包客户端公告之系统停机维护期间。
        </div>
              <div className="qb-agreement-g__ag-content--segment">2. 电信设备出现故障不能进行数据传输的。
        </div>
              <div className="qb-agreement-g__ag-content--segment">3. 因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成融数系统障碍不能执行业务的。
        </div>
              <div className="qb-agreement-g__ag-content--segment">4. 由于黑客攻击、电信部门技术调整或故障、网站升级、银行方面的问题等原因而造成的服务中断或者延迟。
        </div>
              <h3>第十条 责任范围及责任限制
        </h3>
              <div className="qb-agreement-g__ag-content--segment">1. 融数仅在本协议中列明的范围内承担责任。
        </div>
              <div className="qb-agreement-g__ag-content--segment">2. 因交易所产生的任何风险均应由您与交易对方承担。
        </div>
              <div className="qb-agreement-g__ag-content--segment">3. 融数钱包用户信息是由用户本人自行提供的，融数无法保证该信息之准确、及时和完整，您应自行判断交易对方是否具有完全民事行为能力与完整的履约能力并对您的判断承担全部责任。
        </div>
              <div className="qb-agreement-g__ag-content--segment">4. 融数不对交易标的及本服务提供任何形式的保证，包括但不限于以下事项：
        </div>
              <div className="qb-agreement-g__ag-content--segment">4.1 本服务的功能或内容符合您的需求。
        </div>
              <div className="qb-agreement-g__ag-content--segment">4.2 本服务不受干扰、及时提供或免于出错。
        </div>
              <div className="qb-agreement-g__ag-content--segment">4.3 您经由本服务购买或取得之任何产品、服务、资讯或其他资料符合您的期望。
        </div>
              <div className="qb-agreement-g__ag-content--segment">5. 您经由本服务下载或取得的任何资料，应由您自行考量且自负风险，因资料之下载而导致您电脑系统之任何损坏或资料流失，由您自行承担所有后果。
        </div>
              <div className="qb-agreement-g__ag-content--segment">6. 您自融数及融数工作人员或经由本服务取得之建议和资讯，无论其为书面或口头形式，均不构成融数对本服务功能之保证。
        </div>
              <div className="qb-agreement-g__ag-content--segment">7. 在法律允许的情况下，融数对于与本协议有关或由本协议引起的任何间接的、惩罚性的、特殊的、派生的损失（包括业务损失、收益损失、利润损失、使用数据或其他经济利益的损失），不论是如何产生的，也不论是由对本协议的违约（包括违反保证）还是由侵权造成的，均不负有任何责任，即使事先已被告知此等损失的可能性。另外即使本协议规定的排他性救济没有达到其基本目的，也应排除融数对上述损失的责任。</div>
              <div className="qb-agreement-g__ag-content--segment">8. 除本协议另有规定外，在任何情况下，融数对本协议所承担的违约赔偿责任总额不超过向您收取的当次服务费用总额。
        </div>
              <h3>第十一条 完整协议</h3>
              <div className="qb-agreement-g__ag-content--segment">本协议由本协议条款及融数钱包公示的各项规则组成，相关名词可互相引用参照，如有不同理解，以本协议条款为准。您对本协议理解和认同，您即对本协议所有组成部分的内容理解并认同，一旦您使用本服务，您和融数即受本协议所有组成部分的约束。本协议部分内容被有管辖权的法院认定为违法的，不因此影响其他内容的效力。
        </div>
              <h3>第十二条 商标、知识产权的保护
        </h3>
              <div className="qb-agreement-g__ag-content--segment">1. 融数钱包App或手机网页上所有内容，包括但不限于著作、图片、档案、资讯、资料、页面安排、页面设计，均由融数或其关联企业依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业秘密等。</div>
              <div className="qb-agreement-g__ag-content--segment">2. 非经融数或其关联企业书面同意，任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表本网站程序或内容。
        </div>
              <h3>第十三条 法律适用与管辖
        </h3>
              <div className="qb-agreement-g__ag-content--segment">本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。因本协议产生之争议，均应依照中华人民共和国法律予以处理，并由合同签订地人民法院作为管辖法院，为履行本协议之目的，您与融数均确认合同签订地为北京市朝阳区。
        </div>
              <h3>第十四条 附则
        </h3>
              <div className="qb-agreement-g__ag-content--segment">融数保留对本协议条款及各项规则的最终解释权。

        </div>
              <div className="rob-col-lg-24 text-center qb-from-bg-reg-g qb-agreement-g__bottom">
                {/*
                  <button type="button" className="rob-btn rob-btn-minor rob-btn-circle " onClick={this.goLogin}>拒绝协议</button>
                */}
                <button type="button" className="rob-btn rob-btn-danger rob-btn-circle " onClick={this.goSelectRegister}>同意协议并注册</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OnlineProtocol