<section class="content-header">
    <h1>
        Cache DB
        <small>listes</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Tables</a></li>
        <li class="active">Data tables</li>
    </ol>
</section>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
            
            <?php foreach ($tables as $ktable => $table): ?>
               <div class="box-header">
                    <h3 class="box-title">
                        <?php echo $ktable; ?>
                    </h3>
                    <div class="row">
                        <div class="col-sm-3">
                           <?= $this->Form->postLink(__('Update All'), 
                           ['action' => 'updateDBAll', $ktable],
                           ['class' => 'btn btn-block btn-info']) ?>
                        </div>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>LastUpdate</th>
                            <th class="actions"><?= __('Actions') ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($table as $key => $data): ?>
                        <tr>
                            <td>
                                <?php echo $data->id; ?>
                            </td>
                            <td>
                                <?php echo ($data->name) ? $data->name : $data->slug ?>
                            </td>
                            <td>
                                <?php 
                                    $date = new DateTime();
                                    $date->setTimestamp($data->lastUpdate);
                                    echo $date->format('Y-m-d H:i:s'); 
                                ?>
                            </td>
                            <td class="actions">
                                <?= $this->Form->postLink(__('Update'), ['action' => 'updateDB', $ktable, $data->id]) ?>
                                <?php 
                                    if($ktable === "Designs"){
                                        echo $this->Form->postLink(__('Update All Articles'), ['action' => 'updateDBAll', $ktable, $data->id]);    
                                    }
                                ?>
                                
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                    </table>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>