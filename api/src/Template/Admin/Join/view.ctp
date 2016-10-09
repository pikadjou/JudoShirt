<div class="categories view large-10 medium-9 columns">
<?php 
    $datas = $datas->toArray();
    $data = $datas[0][$joins[1]->joinalias]; 
?>
    <h2><?= h($data->name) ?></h2>
    <div>
        <?= $this->Html->link(__('Retour à la Liste'), ['action' => 'index', $mainView]) ?>

        <?= $this->Html->link(__('Edit'), ['action' => 'edit', $mainView, $data->id]) ?>
        <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $data->id], ['confirm' => __('Are you sure you want to delete # {0}?', $data->id)]) ?>
    </div>

    <div class="row">
        <?php foreach ($joins[1]->structure as $name => $type): ?>
            <div class="large-3 columns 
                <?php 
                    switch ($type):
                        case "integer": ?>
                           numbers
                            <?php break;
                        case "string": ?>
                           strings
                            <?php break;
                        case "text": ?>
                           texts
                            <?php break;
                        default: break;
                    endswitch; ?>
            ">
                <h6 class="subheader"><?= __($name) ?></h6>
                <p>
                    <?php 
                    switch ($type){
                        case "boolean": ?>
                            <input type="checkbox" <?php echo ($data->$name == 1) ? 'checked' : '' ?> disabled>
                            <?php break;
                        default:
 
                            switch ($name){
                                case "image":
                                case "thumbnail": ?>
                                    <img src="<?php echo $data->$name; ?>">
                                    <?php break;
                                case "lastProductsUpdate": ?>
                                    <?php echo date("d-m-Y", $data->$name); ?>
                                    <?php break;
                                default: ?>
                                    <?= h($data->$name) ?>
                                    <?php break;
                            }

                    } ?>
                </p>
            </div>
        <?php endforeach; ?>
        
    </div>

    <table cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <?php foreach ($joins[2]->structure as $name => $type): ?>
                <th><?php echo $name ?></th>
            <?php endforeach; ?>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($datas as $data): ?>
        <tr>
            <?php 
            $dataJoin = $data[$joins[2]->joinalias];
            foreach ($joins[2]->structure as $name => $type): ?>
                <td>
                    <?php 
                    if($type == null){
                        echo $dataJoin->$name;
                    } else{
                        switch ($type){
                            case "boolean": ?>
                                <input type="checkbox" <?php echo ($dataJoin->$name == 1) ? 'checked' : '' ?> disabled>
                                <?php break;
                            case "text": ?>
                                <?php echo $this->Text->truncate($dataJoin->$name); ?>
                                <?php break;
                            default:

                                switch ($name){
                                    case "image":
                                    case "thumbnail": 
                                    case "sizeThumbnail": ?>
                                        <img src="<?php echo $dataJoin->$name; ?>">
                                        <?php break;
                                    default: ?>
                                        <?= h($dataJoin->$name) ?>
                                        <?php break;
                                }

                        }
                    }
                     ?>
                </td>
            <?php endforeach; ?>
        </tr>
    <?php endforeach; ?>
    </tbody>
    </table>

  
</div>

