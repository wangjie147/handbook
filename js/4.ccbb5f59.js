(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{522:function(n,s){n.exports="\x3c!--\ntitle: SVN\nsort: 9\n--\x3e\n\nCentOS7安装使用svn\n\n## 安装部署\n\n### 安装SVN\n\n```bash\nyum install httpd subversion mod_dav_svn\nrpm -ql subvserion # 查看 subversion 安装位置\n```\n\nOK 这样就完成了安装。下面是SVN的配置：\n\n\n### 验证安装 \n\n```bash\nsvnserve --version\n\n# svnserve，版本 1.7.14 (r1542130)\n#    编译于 Aug 23 2017，20:43:38\n# \n# 版权所有 (C) 2013 Apache 软件基金会。\n# 此软件包含了许多人的贡献，请查看文件 NOTICE 以获得更多信息。\n# Subversion 是开放源代码软件，请参阅 http://subversion.apache.org/ 站点。\n# \n# 下列版本库后端(FS) 模块可用:\n# \n# * fs_base : 模块只能操作BDB版本库。\n# * fs_fs : 模块与文本文件(FSFS)版本库一起工作。\n# \n# Cyrus SASL 认证可用。\n```\n\n## 代码库创建 \n\nSVN软件安装完成后还需要建立SVN库 \n\n```bash\nmkdir -p /opt/svn/repo\nsvnadmin create /opt/svn/repo\n```\n\n执行上面的命令后，自动建立`repo`库，查看`/opt/svn/repo` 文件夹发现包含了conf, db,format,hooks, locks, README.txt等文件，说明一个SVN库已经建立。\n\n\n## 配置用户\n\n在`/source/svn/【项目文件】/conf`目录下有三个文件：\n\n- `passwd` ： 里面保存用户信息，基本格式为：user = passwd\n- `authz` ： 里面保存用户的分组信息，以及每个组的访问权限\n- `svnserve.conf` ： 里面保存服务器的基本配置（下面介绍）\n\n\n### 添加用户\n\n在 `passwd` 文件中添加用户。 \n\n```bash\n[users]\nharry = harry123\nsally = sally123\nwcj = wcj123\n```\n\n### 配置用户权限\n\n在 `authz` 文件中配置用户权限。 \n\n```bash\n[groups]\nadmin = harry,sally\n\n# 该项目的权限配置\n[/]\n@admin=rw      # admin分组配置读写权限（实际中可以增加只读分组）\n\nwcj=rw # wcj   # 用户的权限为读写\n* = r          # 其他用户的权限为只读\n```\n\n### svnserve.conf配置\n\n```bash\n[general]\n# 匿名用户权限（none：拒绝， write：读写， read：只读权限）\nanon-access = none\nauth-access = write\n\nauthz-db = authz\n\n# 这个配置我给删除了，多数教程填写工程 /opt/svn/repo 目录\n# 我测试没有什么卵用\n# realm = My First Repository\n```\n\n## 启动svn\n\n### 配置防火墙端口 \n\n```bash\nvi /etc/sysconfig/iptables\n# 添加以下内容：\n-A INPUT -m state --state NEW -m tcp -p tcp --dport 3690 -j ACCEPT\n\n# 或者下面方式\n# 开启3690端口的命令，在终端输入以下命令：\niptables -I INPUT -i eth0 -p tcp --dport 3690 -j ACCEPT\niptables -I OUTPUT -o eth0 -p tcp --sport 3690 -j ACCEPT\n# 保存后重启防火墙\nservice iptables save\nservice iptables restart\n```\n\n### 启动SVN \n\n> 注意，创建的工程`repo` 启动指定目录为`/opt/svn` 而不是 ~`/opt/svn/repo`~\n> 这里是非常深的坑哦。\n\n```bash\nsvnserve -d -r /opt/svn\n```\n\n### 启动报警告\n\n```bash\nsvnserve -d -r /opt/svn\nsvnserve: warning: cannot set LC_CTYPE locale\nsvnserve: warning: environment variable LC_CTYPE is UTF-8\nsvnserve: warning: please check that your locale name is correct\n```\n\n解决方法\n\n```bash\necho \"export LC_ALL=C\" >> /etc/profile\n```\n\n### 查看SVN进程 \n\n```bash \nps -ef|grep svn|grep -v grep\n# root     24394     1  0 23:32 ?        00:00:00 svnserve -d -r /opt/svn\n```\n\n### 检测SVN 端口 \n\n```bash\nnetstat -ln |grep 3690\ntcp        0      0 0.0.0.0:3690            0.0.0.0:*               LISTEN\n```\n\n### 停止重启SVN \n\n\n```bash\nkillall svnserve # 停止\nsvnserve -d -r /opt/svn # 启动\n```\n\n\n## 简单SVN命令\n\n\n### 下载克隆项目\n\n```bash\n# 下载项目\nsvn checkout 'url'\n# 简写\nsvn co 'url'\n# 实例\nsvn checkout path（path是服务器上的目录）\nsvn checkout svn://192.168.1.1/pro/domain\n```\n\n\n### 添加\n\n```bash\n# 添加指定文件或目录\nsvn add 'file'或'dir'\n\n# 添加所有目录文件\nsvn add *\n\n# 创建纳入版本目录\nsvn mkdir -m 'commit message' 'url/dir'\n```\n\n### 删除\n\n```bash\n删除指定文件\nsvn delete 'file'\n推荐组合\nsvn delete 'file name'\nsvn commit -m 'delete file name'\n```\n\n### 提交修改\n\n```bash\n# 提交指定文件\nsvn commit -m 'commit message' 'file'\n\n# 提交所有文件\nsvn commit -m 'commit message'\n# 简写\nsvn ci -m\n```\n\n\n### 查看状态\n\n```bash\n# 查看文件或目录状态\nsvn status 'file'或'dir'\n# 简写\nsvn st 'file'或'dir'\n```\n\n正常状态不显示\n\n> ?：不在svn的控制中  \n> M：内容被修改  \n> C：发生冲突  \n> A：预定加入到版本库  \n> K：被锁定  \n\n### 查看日志\n\n```bash\n# 看指定文件日志\nsvn log 'file'\n\n# 查看指定文件详细信息\nsvn info 'file'\n\n# 查看指定目录文件列表\nsvn list 'dir'\n```\n\n\n### 更新\n\n```bash\n# 更新指定文件\nsvn update 'file'\n\n# 更新所有文件\nsvn update\n```\n\n### 锁定\n\n```bash\n# 加锁指定文件\nsvn lock -m 'commit message' 'file'  \n\n# 解锁指定文件\nsvn unlock 'file'\n```\n \n### 比较差异\n\n```bash\n比较指定文件差异\nsvn diff 'file'  \n\n对指定文件的版本1和版本2比较差异\nsvn diff -r version1:version2 'file'  \n```\n\n### 分支\n\n```bash\n从分支A新建出一个分支B\nsvn copy branchA branchB -m 'commit message'    \n```\n\n### 解决冲突\n\n```bash\nsvn resolved \n# 产生冲突是，会生成三个新的文件，\n# svn resolved除了删除冲突文件，\n# 还修正了一些记录在工作拷贝管理区域的记录数据\n```\n\n### 帮助\n\n```bash\nsvn help    \n```\n"}}]);