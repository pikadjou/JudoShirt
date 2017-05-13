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
                        <i class="fa fa-dashboard"></i> 
                        <span>Products</span>
                        <span class="pull-right-container">
                          <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <?php $listeController = ['Articles', 'Products', 'Categories', 'Designs', 'Promotions', 'Prints',
                        'Appearances', 'Sizes', 'Cms', 'Configs']; 

                        asort($listeController);
                        ?>

                        <?php foreach($listeController as $controller): ?>
                        <li class="treeview">
                          <a href="#">
                            <i class="fa fa-dashboard"></i> <span><?= __($controller) ?></span>
                            <span class="pull-right-container">
                              <i class="fa fa-angle-left pull-right"></i>
                            </span>
                          </a>
                          <ul class="treeview-menu">
                            <li>
                                <a href="<?php echo $this->Url->build(['controller' => $controller, 'action' => 'index']) ?>">
                                    <i class="fa fa-circle-o"></i>
                                    <?= __('List') ?>
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo $this->Url->build(['controller' => $controller, 'action' => 'edit']) ?>">
                                    <i class="fa fa-circle-o"></i>
                                    <?= __('New') ?>
                                </a>
                            </li>
                          </ul>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </li>
            </ul>
            <ul class="sidebar-menu">
                <li class="header">Join Configuration</li>

                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-dashboard"></i> 
                        <span>Join</span>
                        <span class="pull-right-container">
                          <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <?php $listeController = ['categoriesdesigns', 'productstypes', 'productsappearances', 'productsprints',
                        'productssizes', 'productsviews'];

                        asort($listeController);
                        ?>

                        <?php foreach($listeController as $controller): ?>
                        <li class="treeview">
                          <a href="#">
                            <i class="fa fa-dashboard"></i> <span><?= __($controller) ?></span>
                            <span class="pull-right-container">
                              <i class="fa fa-angle-left pull-right"></i>
                            </span>
                          </a>
                          <ul class="treeview-menu">
                            <li>
                                <a href="<?php echo $this->Url->build(['controller' => $controller, 'action' => 'index']) ?>">
                                    <i class="fa fa-circle-o"></i>
                                    <?= __('List') ?>
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo $this->Url->build(['controller' => $controller, 'action' => 'edit']) ?>">
                                    <i class="fa fa-circle-o"></i>
                                    <?= __('New') ?>
                                </a>
                            </li>
                          </ul>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </li>
            </ul>
            <ul class="sidebar-menu">
                <li class="header">Cache</li>

                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-dashboard"></i> 
                        <span>File Cache</span>
                        <span class="pull-right-container">
                          <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        
                        <li class="treeview">
                          <a href="<?php echo $this->Url->build(['controller' => 'Caches', 'action' => 'files']) ?>">
                            <i class="fa fa-dashboard"></i> <span><?= __("List") ?></span>
                            <span class="pull-right-container">
                              <i class="fa fa-angle-left pull-right"></i>
                            </span>
                          </a>
                        </li>
                        
                    </ul>
                </li>
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-dashboard"></i> 
                        <span>DB Cache</span>
                        <span class="pull-right-container">
                          <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        
                        <li class="treeview">
                           <a href="<?php echo $this->Url->build(['controller' => 'Caches', 'action' => 'db']) ?>">
                            <i class="fa fa-dashboard"></i> <span><?= __("List") ?></span>
                            <span class="pull-right-container">
                              <i class="fa fa-angle-left pull-right"></i>
                            </span>
                          </a>
                        </li>
                    </ul>
                </li>
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-dashboard"></i> 
                        <span>Other Cache</span>
                        <span class="pull-right-container">
                          <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        
                        <li class="treeview">
                           <a href="<?php echo $this->Url->build(['controller' => 'Caches', 'action' => 'other']) ?>">
                            <i class="fa fa-dashboard"></i> <span><?= __("List") ?></span>
                            <span class="pull-right-container">
                              <i class="fa fa-angle-left pull-right"></i>
                            </span>
                          </a>
                        </li>
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
</div>
</body>
</html>
