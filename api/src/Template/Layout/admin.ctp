<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @since         0.10.0
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

$cakeDescription = 'CakePHP: the rapid development php framework';
?>
<!DOCTYPE html>
<html>
<head>
    <?= $this->Html->charset() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <?= $cakeDescription ?>:
        <?= $this->fetch('title') ?>
    </title>
    <?= $this->Html->meta('icon') ?>

    <?= $this->Html->css('bootstrap.min.css') ?>
    <?= $this->Html->css('AdminLTE.min.css') ?>
    <?= $this->Html->css('skins/_all-skins.min.css') ?>
    <?= $this->Html->css('../plugins/datatables/dataTables.bootstrap.css') ?>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">

    <?= $this->Html->script('../plugins/jQuery/jquery-2.2.3.min.js') ?>
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <script>$.widget.bridge('uibutton', $.ui.button);</script>
    <?= $this->Html->script('bootstrap.min.js') ?>
    <?= $this->Html->script('app.min.js') ?>

<!--
    <?= $this->Html->script('../plugins/datatables/jquery.dataTables.min.js') ?>
    <?= $this->Html->script('../plugins/datatables/dataTables.bootstrap.min.js') ?>
-->



    <?= $this->fetch('meta') ?>
    <?= $this->fetch('css') ?>
    <?= $this->fetch('script') ?>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
    <header class="main-header">
        <a href="/admin" class="logo">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini"><b>M.</b>Shirt</span>
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg"><b>Martial</b>Shirt</span>
        </a>
        <nav class="navbar navbar-static-top">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
            </a>

            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li>
                        <a><?= $this->fetch('title') ?></a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

    <aside class="main-sidebar">
        <section class="sidebar">
            <div class="user-panel">
                <div class="pull-left image">
                  <img src="/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                  <p>Alexander Pierce</p>
                  <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>

            <ul class="sidebar-menu">
                <li class="header">Products Configuration</li>
                <li class="treeview">
                  <a href="#">
                    <i class="fa fa-dashboard"></i> <span><?= __('Articles') ?></span>
                    <span class="pull-right-container">
                      <i class="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul class="treeview-menu">
                    <li>
                        <a href="<?php echo $this->Url->build(['controller' => 'Articles', 'action' => 'index']) ?>">
                            <i class="fa fa-circle-o"></i>
                            <?= __('List') ?>
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo $this->Url->build(['controller' => 'Articles', 'action' => 'edit']) ?>">
                            <i class="fa fa-circle-o"></i>
                            <?= __('New') ?>
                        </a>
                    </li>
                  </ul>
                </li>
                <li class="treeview">
                  <a href="#">
                    <i class="fa fa-dashboard"></i> <span><?= __('Products') ?></span>
                    <span class="pull-right-container">
                      <i class="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul class="treeview-menu">
                    <li>
                        <a href="<?php echo $this->Url->build(['controller' => 'Products', 'action' => 'index']) ?>">
                            <i class="fa fa-circle-o"></i>
                            <?= __('List') ?>
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo $this->Url->build(['controller' => 'Products', 'action' => 'edit']) ?>">
                            <i class="fa fa-circle-o"></i>
                            <?= __('New') ?>
                        </a>
                    </li>
                  </ul>
                </li>
                <li class="treeview">
                  <a href="#">
                    <i class="fa fa-files-o"></i>
                    <span>Layout Options</span>
                    <span class="pull-right-container">
                      <span class="label label-primary pull-right">4</span>
                    </span>
                  </a>
                  <ul class="treeview-menu">
                    <li><a href="pages/layout/top-nav.html"><i class="fa fa-circle-o"></i> Top Navigation</a></li>
                    <li><a href="pages/layout/boxed.html"><i class="fa fa-circle-o"></i> Boxed</a></li>
                    <li><a href="pages/layout/fixed.html"><i class="fa fa-circle-o"></i> Fixed</a></li>
                    <li><a href="pages/layout/collapsed-sidebar.html"><i class="fa fa-circle-o"></i> Collapsed Sidebar</a></li>
                  </ul>
                </li>
            </ul>
        </section>
    </aside>

    <div class="content-wrapper">
        <?= $this->Flash->render() ?>

        <?= $this->fetch('content') ?>

    </div>


    <footer class="main-footer">
        <div class="pull-right hidden-xs">
          <b>Version</b> 2.3.6
        </div>
        <strong>Copyright &copy; 2014-2016 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong> All rights
        reserved.
    </footer>


<!--
    <div id="container">

        <div id="content">
            <?= $this->Flash->render() ?>

            <div class="row">
                <div class="actions columns large-2 medium-3">
                    <h3><?= __('Actions') ?></h3>
                    <ul class="side-nav">
                        <li>
                            Products
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'Products', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'Products', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Categories
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'Categories', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'Categories', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Designs
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'Designs', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'Designs', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Impressions
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'prints', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'prints', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Appearances
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'Appearances', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'Appearances', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Sizes
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'Sizes', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'Sizes', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Cms
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'cms', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'cms', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Configurations
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'Configs', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'Configs', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <footer>
        </footer>
    </div>
    -->
</div>
</body>
</html>
