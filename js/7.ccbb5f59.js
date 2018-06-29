(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{525:function(n,e){n.exports='\x3c!--\ntitle: OpenStack\nsort: 4\n--\x3e\n\nCentOS7安装OpenStack\n\n## 概念简介\n\n**OpenStack**：OpenStack是一个由NASA和Rackspace合作研发并发起的，以Apache许可证授权的自由软件和开放源代码项目。项目目标是提供实施简单、可大规模扩展、丰富、标准统一的云计算管理平台。OpenStack通过各种互补的服务提供了基础设施即服务（IaaS）的解决方案，每个服务提供API以进行集成。OpenStack是用Python编程语言编写的。\n\n**DevStack**：可以自动安装OpenStack的工具。\n\n**OpenStack核心项目**：OpenStack是由很多核心项目组合在一起的。\n\n**计算(Compute)**：Nova。一套控制器，用于为单个用户或使用群组管理虚拟机实例的整个生命周期，根据用户需求来提供虚拟服务。负责虚拟机创建、开机、关机、挂起、暂停、调整、迁移、重启、销毁等操作，配置CPU、内存等信息规格。自Austin版本集成到项目中。\n\n**对象存储(Object Storage)**：Swift。一套用于在大规模可扩展系统中通过内置冗余及高容错机制实现对象存储的系统，允许进行存储或者检索文件。可为Glance提供镜像存储，为Cinder提供卷备份服务。自Austin版本集成到项目中。\n\n**镜像服务(Image Service)**：Glance。一套虚拟机镜像查找及检索系统，支持多种虚拟机镜像格式(AKI、AMI、ARI、ISO、QCOW2、Raw、VDI、VHD、VMDK)，有创建上传镜像、删除镜像、编辑镜像基本信息的功能。自Bexar版本集成到项目中。\n\n**身份服务(Identity Service)**：Keystone。为OpenStack其他服务提供身份验证、服务规则和服务令牌的功能，管理Domains、Projects、Users、Groups、Roles。自Essex版本集成到项目中。\n\n**网络&地址管理(Network）**：Neutron。提供云计算的网络虚拟化技术，为OpenStack其他服务提供网络连接服务。为用户提供接口，可以定义Network、Subnet、Router，配置DHCP、DNS、负载均衡、L3服务，网络支持GRE、VLAN。插件架构支持许多主流的网络厂家和技术，如OpenvSwitch。自Folsom版本集成到项目中。\n\n**块存储(Block Storage)**：Cinder。为运行实例提供稳定的数据块存储服务，它的插件驱动架构有利于块设备的创建和管理，如创建卷、删除卷，在实例上挂载和卸载卷。自Folsom版本集成到项目中。\n\n**UI 界面(Dashboard)**：Horizon。OpenStack中各种服务的Web管理门户，用于简化用户对服务的操作，例如：启动实例、分配IP地址、配置访问控制等。自Essex版本集成到项目中。\n\n**pip**：是一个Python包管理工具，主要是用于安装 PyPI 上的软件包，DevStack安装OpenStack的时候会使用到这个工具。\n\n## 安装\n\n```\nwget --no-check-certificate http://rdo.fedorapeople.org/rdo-release.rpm\nrpm -ivh rdo-release.rpm\n\nyum install -y openstack-packstack\nyum -y update\n\n# 接下来一键安装OpenStack，--install-hosts参数需要输入你的IP地址\npackstack --install-hosts=your_ip; # 提示输入的时候输入你的密码，等待安装完成即可。\npackstack --allinone\n\n# 输出结果\nYou will find full trace in log /var/tmp/packstack/20170113-125411-kkk_H3/manifests/192.168.188.127_controller.pp.log\nPlease check log file /var/tmp/packstack/20170113-125411-kkk_H3/openstack-setup.log for more information\nAdditional information:\n * A new answerfile was created in: /root/packstack-answers-20170113-125412.txt\n * Time synchronization installation was skipped. Please note that unsynchronized time on server instances might be problem for some OpenStack components.\n * File /root/keystonerc_admin has been created on OpenStack client host 192.168.188.127. To use the command line tools you need to source the file.\n * To access the OpenStack Dashboard browse to http://192.168.188.127/dashboard .\nPlease, find your login credentials stored in the keystonerc_admin in your home directory.\n * To use Nagios, browse to http://192.168.188.127/nagios username: nagiosadmin, password: de7af5954a834f89\n# reboot 重启机器\n```\n\n## 安装Mitaka\n\n执行下列命令安装RDO库[RDO官网](https://www.rdoproject.org/install/quickstart/)\n\n```\nyum install https://rdoproject.org/repos/rdo-release.rpm\nyum reinstall -y http://rdo.fedorapeople.org/rdo-release.rpm\n```\n\n安装CentOS openstack RPM repository\n\n```\nyum install centos-release-openstack-mitaka\n\n# 最新的版本\nyum install -y centos-release-openstack-newton\n```\n\n更新系统包\n\n```\nyum update -y\n```\n\n安装packstack工具\n\n```\nyum install -y openstack-packstack\n```\n\n安装openstack newton版本\n\n```\npackstack --allinone\n```\n\n执行这一步之后会花费一些时间\n\n## 卸载\n\n```bash\nyum list installed | grep @openstack- | awk \'{ print $1 }\' | xargs yum -y remove\n```\n\n## 登陆Dashboard\n\n```bash\ncat /root/keystonerc_admin \n\nexport OS_USERNAME=admin\nexport OS_TENANT_NAME=admin\nexport OS_PASSWORD=d6433394e15f4175\nexport OS_AUTH_URL=http://10.1.199.8:35357/v2.0/\nexport PS1=\'[\\u@\\h \\W(keystone_admin)]\\$ \'\n```\n\n## 错误处理\n\n### devstack部署openstack遇到rdo源配置问题及解决办法\n\n```bash\nyum install http://rdo.fedorapeople.org/rdo-release.rpm\n无法打开 http://rdo.fedorapeople.org/rdo-release.rpm ，跳过。\n错误：无须任何处理\n```\n\n解决办法\n\n```bash\nwget --no-check-certificate http://rdo.fedorapeople.org/rdo-release.rpm\nrpm -ivh rdo-release.rpm\n```\n\n### 端口被占用\n\n```shell\n# 查看到80端口\nnetstat -lnp|grep 80\n\ntcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      27906/nginx: master\ntcp        0      0 0.0.0.0:6080            0.0.0.0:*               LISTEN      32437/python2\nunix  2      [ ACC ]     STREAM     LISTENING     21680    2003/master          public/flush\nunix  2      [ ACC ]     STREAM     LISTENING     13380    1/systemd            /run/lvm/lvmetad.sock\n```\n\n杀掉或者停用服务\n\n```shell\nkill -9 27906\n```\n\n\n```\nwarning: /var/cache/yum/x86_64/7/openstack-newton/packages/hiera-1.3.4-5.el7.noarch.rpm: Header V4 RSA/SHA1 Signature, key ID 764429e6: NOKEY2.4 MB  00:00:53 ETA\nhiera-1.3.4-5.el7.noarch.rpm 的公钥尚未安装\n```\n\n\n```\nERROR : Error appeared during Puppet run: 192.168.188.127_controller.pp\nError: Could not prefetch nova_flavor provider \'openstack\': Command: \'openstack ["flavor", "list", "--quiet", "--format", "csv", ["--long", "--all"]]\' has been running for more than 40 seconds (tried 4, for a total of 170 seconds)\n```\n\n## 日志\n\nOpenStack通过生成大量日志信息来帮助排查系统安装运行期间出现的问题，接下来介绍几个常见服务的相关日志位置。\n\n### Nova日志\n\nOpenStack计算服务日志位于/var/log/nova，默认权限拥有者是nova用户。需要注意的是，并不是每台服务器上都包含所有的日志文件,例如nova-compute.log仅在计算节点生成。\n\n- nova-compute.log：虚拟机实例在启动和运行中产生的日志\n- nova-network.log：关于网络状态、分配、路由和安全组的日志\n- nova-manage.log：运行nova-manage命令时产生的日志\n- nova-scheduler.log：有关调度的，分配任务给节点以及消息队列的相关日志\n- nova-objectstore.log：镜像相关的日志\n- nova-api.log：用户与OpenStack交互以及OpenStack组件间交互的消息相关日志\n- nova-cert.log：nova-cert过程的相关日志\n- nova-console.log：关于nova-console的VNC服务的详细信息\n- nova-consoleauth.log：关于nova-console服务的验证细节\n- nova-dhcpbridge.log：与dhckbridge服务先关的网络信息\n\n### Dashboard日志\n\nDashboard是一个DJango的web应用程序，默认运行在Apache服务器上，相应的运行日志也都记录在Apache的日志中，用户可以在`/var/log/apache2/`中查看。\n\n### 存储日志\n\n对象存储Swift默认日志写到syslog中，在Ubuntu系统中，可以通过/var/log/syslog查看，在其他系统中，可能位于/var/log/messages中。 \n块存储Cinder产生的日志默认存放在/var/log/cinder目录中 \n- cinder-api.log：关于cinder-api服务的细节 \n- cinder-scheduler.log：关于cinder调度服务的操作的细节 \n- cinder-volume.log：与cinder卷服务相关的日志项\n\nKeystone日志\n\n身份认证Keystone服务的日志记录在/var/log/keystone/keystone.log中。\n\n### Glance日志\n\n镜像服务Glance的日志默认存放在/var/log/glance目录中 \n- api.log：Glance API相关的日志 \n- registry.log：Glance registry服务相关的日志 \n根据日志配置的不同，会保存诸如元信息更新和访问记录这些信息。\n\n### Neutron日志\n\n网络服务Neutron的日志默认存放在/var/log/neutron目录中 \n- dhcp-agent.log：关于dhcp-agent的日志 \n- l3-agent.log：与l3代理及其功能相关的日志 \n- metadata-agent.log：通过neutron代理给Nova元数据服务的相关日志 \n- openvswitch-agent.log：与openvswitch相关操作的日志项，在具体实现OpenStack网络时，如果使用了不同的插件，就会有相应的日志文件名 \n- server.log：与Neutron API服务相关的日志\n\n### 改变日志级别\n\n每个OpenStack服务的默认日志级别均为警告级（Warning），该级别的日志对于了解运行中系统的状态或者基本的错误定位已经够用，但是有时候需要上调日志级别来帮助诊断问题，或者下调日志级别以减少日志噪声。由于各个服务的日志设置方式类似，因此这里就以Nova服务为例。\n\n#### 设置Nova服务的日志级别\n\n```\nvi /etc/nova/logging.conf \n```\n\n将列出的服务的日志级别修改为DEBUG、INFO或WARNING\n\n```\n[logger_root]\nlevel = WARNING\nhandlers = null\n\n[logger_nova]\nlevel = INFO\nhandlers = stderr\nqualname = nova\n......\n```\n\n#### 设置其他OpenStack服务中的日志级别\n\n其他服务（如Glance和Keystone）目前都在它们的主配置文件中设置了日志级别颗，例如/etc/glance/glance-api.conf。可以通过修改这些文件中对应设置来将日志级别调整到INFO和DEBUG：\n\n```\n[DEFAULT]\n#set INFO log level output\nverbose = False\n\n#set DEBUG log level output\ndebug = False\n```\n\n## 服务管理\n\n```bash\nsystemctl stop httpd\nsystemctl start httpd\n```\n\n### 重启 Neutron 服务\n\n#### 控制节点\n\n```\nservice openstack-nova-api restart\nservice openstack-nova-scheduler restart\nservice openstack-nova-conductor restart\nservice neutron-server restart\n```\n\n#### 网络节点\n\n```\nservice openvswitch restart\nservice neutron-openvswitch-agent restart（fuel控制节点默认stop）\nservice neutron-l3-agent restart（fuel控制节点默认stop）\nservice neutron-dhcp-agent restart（fuel控制节点默认stop）\nservice neutron-metadata-agent restart（fuel控制节点默认stop）\n```\n\n#### 计算节点\n\n```\nservice neutron-openvswitch-agent restart\nservice openvswitch restart\n```\n\n### 重启cinder服务\n\n#### 存储节点\n\n```\nservice openstack-cinder-api restart\nservice openstack-cinder-scheduler restart\n```\n\n#### 存储节点\n\n```\nservice openstack-cinder-volume restart\n```\n\n### 重启glance服务\n\n```\nservice openstack-glance-api restart\nservice openstack-glance-registry restart\n```\n\n### 重启Swift服务\n\n#### 控制节点\n\n```\nservice openstack-swift-proxy restart\nservice memcached restart\n```\n\n#### 存储节点\n\n```\nservice openstack-swift-account restart\nservice openstack-swift-account-auditor restart\nservice openstack-swift-account-reaper restart\nservice openstack-swift-account-replicator restart\nservice openstack-swift-container restart\nservice openstack-swift-container-auditor restart\nservice openstack-swift-container-replicator restart\nservice openstack-swift-container-updater restart\nservice openstack-swift-object restart\nservice openstack-swift-object-auditor restart\nservice openstack-swift-object-replicator restart\nservice openstack-swift-object-updater restart\n```\n\n### 重启Nova服务\n\n#### 控制节点\n\n```\nservice openstack-nova-api restart\nservice openstack-nova-cert restart\nservice openstack-nova-consoleauth restart\nservice openstack-nova-scheduler restart\nservice openstack-nova-conductor restart\nservice openstack-nova-novncproxy restart\n```\n\n#### 计算节点\n\n```\nservice libvirtd restart\nservice openstack-nova-compute restart\n```\n\n## 参考知识\n\n- [在 CentOS7.2 上安装 OpenStack Liberty 版](http://www.infocool.net/kb/OpenStack/201609/187078.htmldddAA)\n- [OpenStack部署都有哪些方式](http://www.trystack.cn/Articles/openstack-deployment.html)\n- [Openstack安装部署](http://promisejohn.github.io/2015/05/07/HelloOpenstack/)\n- [CentOS 6.4 RDO测试](http://www.chenshake.com/centos-6-4-rdo-test/)\n- [Install And Configure OpenStack Mitaka RDO On CentOS 7](http://linuxpitstop.com/openstack-mitaka-rdo-on-centos-7/)\n- [OpenStack Havana Dashboard测试和使用](http://www.chenshake.com/openstack-havana-dashboard-to-test-and-use/#i)\n- [OpenStack安装视频教程](http://cloudman.cc/)\n- [10分钟安装OpenStack](https://www.ustack.com/blog/install-openstack-in-10mins/#OpenStack-3/)\n- [cirros镜像下载](http://download.cirros-cloud.net/0.3.4/)\n- [制作openstack镜像win7.qcow2（centos/ubuntu/win镜像分享）](http://blog.csdn.net/qq_20154221/article/details/51586537) 镜像密码均为 intel@123\n\n\n'}}]);